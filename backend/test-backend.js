import app from './server.js';
import http from 'http';

async function runTests() {
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(5099, resolve));
  const baseUrl = 'http://localhost:5099';
  let createdId;

  console.log('🧪 Starting Backend API Automated Verification Suite...\n');

  try {
    // 1. Health Check
    console.log('1. Testing GET /api/health');
    const healthRes = await fetch(`${baseUrl}/api/health`);
    const healthData = await healthRes.json();
    console.log('   Status:', healthRes.status, 'Response:', JSON.stringify(healthData));
    if (healthData.status !== 'ONLINE') throw new Error('Health check failed');

    // 2. Get Teams
    console.log('\n2. Testing GET /api/teams');
    const teamsRes = await fetch(`${baseUrl}/api/teams`);
    const teamsData = await teamsRes.json();
    console.log('   Status:', teamsRes.status, 'Count:', teamsData.count);
    if (!teamsData.success || !Array.isArray(teamsData.teams)) throw new Error('Get teams failed');

    // 3. Register New Team
    console.log('\n3. Testing POST /api/teams/register');
    const newTeamPayload = {
      teamName: `Test Cyber Squadron ${Date.now()}`,
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

    // 4. Search Teams
    console.log('\n4. Testing GET /api/teams/search');
    const searchRes = await fetch(`${baseUrl}/api/teams/search?q=${encodeURIComponent(createdId)}`);
    const searchData = await searchRes.json();
    console.log('   Status:', searchRes.status, 'Matches:', searchData.count);
    if (!searchData.success || searchData.count !== 1) throw new Error('Search failed');

    // 5. Admin Login
    console.log('\n5. Testing POST /api/admin/login');
    const loginRes = await fetch(`${baseUrl}/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'ACMCODENITE', password: 'RONAK12' }),
    });
    const loginData = await loginRes.json();
    console.log('   Status:', loginRes.status, 'Token:', loginData.token ? 'YES' : 'NO');
    if (!loginData.success || !loginData.token) throw new Error('Admin login failed');

    // 6. Admin Cancel Team
    console.log('\n6. Testing PATCH /api/admin/teams/:id/cancel');
    const cancelRes = await fetch(`${baseUrl}/api/admin/teams/${createdId}/cancel`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reason: 'Automated test cancellation' }),
    });
    const cancelData = await cancelRes.json();
    console.log('   Status:', cancelRes.status, 'Team Status:', cancelData.team?.status);
    if (!cancelData.success || cancelData.team?.status !== 'CANCELLED') throw new Error('Cancel failed');

    // 7. Admin Reactivate Team
    console.log('\n7. Testing PATCH /api/admin/teams/:id/reactivate');
    const reactivateRes = await fetch(`${baseUrl}/api/admin/teams/${createdId}/reactivate`, {
      method: 'PATCH',
    });
    const reactivateData = await reactivateRes.json();
    console.log('   Status:', reactivateRes.status, 'Team Status:', reactivateData.team?.status);
    if (!reactivateData.success || reactivateData.team?.status !== 'ACTIVE') throw new Error('Reactivate failed');

    // 8. Admin Stats
    console.log('\n8. Testing GET /api/admin/stats');
    const statsRes = await fetch(`${baseUrl}/api/admin/stats`);
    const statsData = await statsRes.json();
    console.log('   Status:', statsRes.status, 'Total Teams:', statsData.stats?.totalTeams, 'Active:', statsData.stats?.activeTeams);
    if (!statsData.success || statsData.stats?.totalTeams < 1) throw new Error('Stats failed');

    // 9. Export CSV
    console.log('\n9. Testing GET /api/teams/export/csv');
    const csvRes = await fetch(`${baseUrl}/api/teams/export/csv`);
    const csvText = await csvRes.text();
    console.log('   Status:', csvRes.status, 'CSV Length (chars):', csvText.length, 'Has Header:', csvText.includes('Registration ID'));
    if (!csvRes.ok || !csvText.includes('Registration ID')) throw new Error('CSV Export failed');

    console.log('\n10. Cleaning up test team');
    const cleanupRes = await fetch(`${baseUrl}/api/admin/teams/${createdId}`, {
      method: 'DELETE',
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
