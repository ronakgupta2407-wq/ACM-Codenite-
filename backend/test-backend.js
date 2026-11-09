import app from './server.js';
import http from 'http';

async function runTests() {
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(5099, resolve));
  const baseUrl = 'http://localhost:5099';
  let createdId;
  let adminToken;

  console.log('🧪 Starting Backend API Automated Verification Suite...\n');

  try {
    if (!process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD || !process.env.AUTH_TOKEN_SECRET) {
      throw new Error('Set ADMIN_USERNAME, ADMIN_PASSWORD, and AUTH_TOKEN_SECRET in the environment before running API tests.');
    }

    // 1. Health Check
    console.log('1. Testing GET /api/health');
    const healthRes = await fetch(`${baseUrl}/api/health`);
    const healthData = await healthRes.json();
    console.log('   Status:', healthRes.status, 'Response:', JSON.stringify(healthData));
    if (healthData.status !== 'ONLINE') throw new Error('Health check failed');

    // 2. Confirm sensitive team data is not publicly accessible
    console.log('\n2. Testing unauthenticated team-list denial');
    const deniedTeamsRes = await fetch(`${baseUrl}/api/teams`);
    if (deniedTeamsRes.status !== 401) throw new Error('Unauthenticated team list was not rejected');

    // 3. Admin Login
    console.log('\n3. Testing POST /api/admin/login');
    const loginRes = await fetch(`${baseUrl}/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: process.env.ADMIN_USERNAME,
        password: process.env.ADMIN_PASSWORD,
      }),
    });
    const loginData = await loginRes.json();
    console.log('   Status:', loginRes.status, 'Token:', loginData.token ? 'YES' : 'NO');
    if (!loginData.success || !loginData.token) throw new Error('Admin login failed');
    adminToken = loginData.token;
    const adminHeaders = { Authorization: `Bearer ${adminToken}` };

    // 4. Get Teams
    console.log('\n4. Testing authenticated GET /api/teams');
    const teamsRes = await fetch(`${baseUrl}/api/teams`, { headers: adminHeaders });
    const teamsData = await teamsRes.json();
    console.log('   Status:', teamsRes.status, 'Count:', teamsData.count);
    if (!teamsData.success || !Array.isArray(teamsData.teams)) throw new Error('Get teams failed');

    // 5. Register New Team
    console.log('\n5. Testing POST /api/teams/register');
    const formulaTeamName = `=1+1 ${Date.now()}`;
    const newTeamPayload = {
      teamName: formulaTeamName,
      track: 'AI & Intelligent Systems',
      members: [
        { name: 'Aditya Leader', email: `test.leader.${Date.now()}@mitsgwalior.in`, phone: '9826011111', gender: 'Male', college: 'MITS Gwalior', enrollmentNo: '0901CS221001', year: '3rd Year', branch: 'CSE', city: 'Gwalior, MP' },
        { name: 'Member Two', email: `member2.${Date.now()}@mitsgwalior.in`, phone: '9826011112', gender: 'Female', college: 'MITS Gwalior', enrollmentNo: '0901CS221002', year: '3rd Year', branch: 'CSE', city: 'Gwalior, MP' },
        { name: 'Member Three', email: `member3.${Date.now()}@mitsgwalior.in`, phone: '9826011113', gender: 'Male', college: 'MITS Gwalior', enrollmentNo: '0901CS221003', year: '3rd Year', branch: 'CSE', city: 'Gwalior, MP' },
        { name: 'Member Four', email: `member4.${Date.now()}@mitsgwalior.in`, phone: '9826011114', gender: 'Female', college: 'MITS Gwalior', enrollmentNo: '0901CS221004', year: '3rd Year', branch: 'CSE', city: 'Gwalior, MP' },
      ],
    };
    const regRes = await fetch(`${baseUrl}/api/teams/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTeamPayload),
    });
    const regData = await regRes.json();
    console.log('   Status:', regRes.status, 'Reg ID:', regData.registrationId);
    if (!regData.success || !regData.registrationId) throw new Error('Registration failed');

    createdId = regData.registrationId;

    // 6. Verify public status lookup only returns minimal team details
    console.log('\n6. Testing privacy-limited public status lookup');
    const statusRes = await fetch(`${baseUrl}/api/teams/status`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        registrationId: createdId,
        email: newTeamPayload.members[0].email,
      }),
    });
    const statusData = await statusRes.json();
    if (!statusData.success || statusData.team.members || statusData.team.status !== 'ACTIVE') {
      throw new Error('Privacy-limited status lookup failed');
    }

    // 7. Search Teams
    console.log('\n7. Testing authenticated GET /api/teams/search');
    const searchRes = await fetch(`${baseUrl}/api/teams/search?q=${encodeURIComponent(createdId)}`, {
      headers: adminHeaders,
    });
    const searchData = await searchRes.json();
    console.log('   Status:', searchRes.status, 'Matches:', searchData.count);
    if (!searchData.success || searchData.count !== 1) throw new Error('Search failed');

    // 8. Admin Cancel Team
    console.log('\n8. Testing PATCH /api/admin/teams/:id/cancel');
    const cancelRes = await fetch(`${baseUrl}/api/admin/teams/${createdId}/cancel`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...adminHeaders },
      body: JSON.stringify({ reason: 'Automated test cancellation' }),
    });
    const cancelData = await cancelRes.json();
    console.log('   Status:', cancelRes.status, 'Team Status:', cancelData.team?.status);
    if (!cancelData.success || cancelData.team?.status !== 'CANCELLED') throw new Error('Cancel failed');

    // 9. Admin Reactivate Team
    console.log('\n9. Testing PATCH /api/admin/teams/:id/reactivate');
    const reactivateRes = await fetch(`${baseUrl}/api/admin/teams/${createdId}/reactivate`, {
      method: 'PATCH',
      headers: adminHeaders,
    });
    const reactivateData = await reactivateRes.json();
    console.log('   Status:', reactivateRes.status, 'Team Status:', reactivateData.team?.status);
    if (!reactivateData.success || reactivateData.team?.status !== 'ACTIVE') throw new Error('Reactivate failed');

    // 10. Admin Stats
    console.log('\n10. Testing GET /api/admin/stats');
    const statsRes = await fetch(`${baseUrl}/api/admin/stats`, { headers: adminHeaders });
    const statsData = await statsRes.json();
    console.log('   Status:', statsRes.status, 'Total Teams:', statsData.stats?.totalTeams, 'Active:', statsData.stats?.activeTeams);
    if (!statsData.success || statsData.stats?.totalTeams < 1) throw new Error('Stats failed');

    // 11. Export CSV
    console.log('\n11. Testing authenticated GET /api/teams/export/csv');
    const csvRes = await fetch(`${baseUrl}/api/teams/export/csv`, { headers: adminHeaders });
    const csvText = await csvRes.text();
    console.log('   Status:', csvRes.status, 'CSV Length (chars):', csvText.length, 'Has Header:', csvText.includes('Registration ID'));
    if (!csvRes.ok || !csvText.includes('Registration ID') || !csvText.includes(`"'${formulaTeamName}`)) {
      throw new Error('CSV Export failed or formula-like cells were not neutralized');
    }

    console.log('\n10. Cleaning up test team');
    const cleanupRes = await fetch(`${baseUrl}/api/admin/teams/${createdId}`, {
      method: 'DELETE',
      headers: adminHeaders,
    });
    const cleanupData = await cleanupRes.json();
    console.log('   Status:', cleanupRes.status, 'Deleted:', cleanupData.success);
    if (!cleanupData.success) throw new Error('Test team cleanup failed');
    createdId = null;

    console.log('\n======================================================');
    console.log('✅ ALL BACKEND API TESTS PASSED WITH 100% SUCCESS!');
    console.log('======================================================\n');
  } catch (err) {
    console.error('\n❌ Test failed:', err);
    process.exitCode = 1;
  } finally {
    if (createdId) {
      try {
        const cleanupRes = await fetch(`${baseUrl}/api/admin/teams/${createdId}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${adminToken}` },
        });
        if (!cleanupRes.ok) throw new Error(`Cleanup returned HTTP ${cleanupRes.status}`);
      } catch (cleanupErr) {
        console.error('Failed to remove test team:', cleanupErr);
        process.exitCode = 1;
      }
    }
    await new Promise((resolve, reject) => {
      server.close((err) => (err ? reject(err) : resolve()));
    });
  }
}

runTests();
