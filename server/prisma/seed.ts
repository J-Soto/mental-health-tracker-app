import { PrismaClient } from '@prisma/client';
import { subDays, subHours, format } from 'date-fns';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');
  
  const testUser = await prisma.user.findFirst();
  if (!testUser) {
    console.error('❌ No user found. Please login first with Google OAuth, then run the seed.');
    process.exit(1);
  }

  console.log(`✅ Using user: ${testUser.email}`);

  await prisma.dailyLog.deleteMany({
    where: { userId: testUser.id },
  });

  console.log('🗑️  Cleared existing logs');

  const logs = [];
  const now = new Date();

  const physicalActivities = [
    '30 minutes jogging in the park',
    '45 minutes yoga session',
    '1 hour gym workout - cardio and weights',
    '20 minutes brisk walking',
    '1 hour swimming',
    'Rest day - light stretching only',
    '40 minutes cycling',
    '15 minutes morning exercises',
    null,
    '',
  ];

  const sleepDisturbances = [
    'Woke up 2 times during the night',
    'Had nightmares about work stress',
    'Difficulty falling asleep, took 1 hour',
    'Woke up early at 5 AM, couldn\'t go back to sleep',
    'Restless sleep, tossed and turned',
    'Neighbor\'s noise woke me up at 3 AM',
    null,
    '',
  ];

  const symptoms = [
    'Headache in the afternoon',
    'Feeling tired all day',
    'Mild anxiety before meeting',
    'Back pain from sitting too long',
    'Stomach discomfort after lunch',
    'Feeling energetic and focused',
    null,
    '',
  ];

  for (let i = 0; i < 8; i++) {
    const date = subHours(now, i);
    logs.push({
      userId: testUser.id,
      date: format(date, 'yyyy-MM-dd HH:mm:ss'),
      mood: Math.floor(Math.random() * 5) + 1,
      anxiety: Math.floor(Math.random() * 5) + 1,
      stress: Math.floor(Math.random() * 5) + 1,
      sleepQuality: Math.floor(Math.random() * 5) + 1,
      sleep: parseFloat((Math.random() * 4 + 5).toFixed(1)),
      socialInteractions: Math.floor(Math.random() * 15),
      physicalActivity: physicalActivities[Math.floor(Math.random() * physicalActivities.length)],
      sleepDisturbances: sleepDisturbances[Math.floor(Math.random() * sleepDisturbances.length)],
      symptoms: symptoms[Math.floor(Math.random() * symptoms.length)],
    });
  }

  for (let i = 1; i <= 30; i++) {
    const date = subDays(now, i);
    logs.push({
      userId: testUser.id,
      date: format(date, 'yyyy-MM-dd'),
      mood: Math.floor(Math.random() * 5) + 1,
      anxiety: Math.floor(Math.random() * 5) + 1,
      stress: Math.floor(Math.random() * 5) + 1,
      sleepQuality: Math.floor(Math.random() * 5) + 1,
      sleep: parseFloat((Math.random() * 4 + 5).toFixed(1)),
      socialInteractions: Math.floor(Math.random() * 20),
      physicalActivity: physicalActivities[Math.floor(Math.random() * physicalActivities.length)],
      sleepDisturbances: sleepDisturbances[Math.floor(Math.random() * sleepDisturbances.length)],
      symptoms: symptoms[Math.floor(Math.random() * symptoms.length)],
    });
  }

  for (let i = 31; i <= 90; i += 2) {
    const date = subDays(now, i);
    logs.push({
      userId: testUser.id,
      date: format(date, 'yyyy-MM-dd'),
      mood: Math.floor(Math.random() * 5) + 1,
      anxiety: Math.floor(Math.random() * 5) + 1,
      stress: Math.floor(Math.random() * 5) + 1,
      sleepQuality: Math.floor(Math.random() * 5) + 1,
      sleep: parseFloat((Math.random() * 4 + 5).toFixed(1)),
      socialInteractions: Math.floor(Math.random() * 20),
      physicalActivity: physicalActivities[Math.floor(Math.random() * physicalActivities.length)],
      sleepDisturbances: sleepDisturbances[Math.floor(Math.random() * sleepDisturbances.length)],
      symptoms: symptoms[Math.floor(Math.random() * symptoms.length)],
    });
  }

  for (let i = 91; i <= 365; i += 7) {
    const date = subDays(now, i);
    logs.push({
      userId: testUser.id,
      date: format(date, 'yyyy-MM-dd'),
      mood: Math.floor(Math.random() * 5) + 1,
      anxiety: Math.floor(Math.random() * 5) + 1,
      stress: Math.floor(Math.random() * 5) + 1,
      sleepQuality: Math.floor(Math.random() * 5) + 1,
      sleep: parseFloat((Math.random() * 4 + 5).toFixed(1)),
      socialInteractions: Math.floor(Math.random() * 25),
      physicalActivity: physicalActivities[Math.floor(Math.random() * physicalActivities.length)],
      sleepDisturbances: sleepDisturbances[Math.floor(Math.random() * sleepDisturbances.length)],
      symptoms: symptoms[Math.floor(Math.random() * symptoms.length)],
    });
  }

  logs.push({
    userId: testUser.id,
    date: format(subDays(now, 200), 'yyyy-MM-dd'),
    mood: 5,
    anxiety: 1,
    stress: 1,
    sleepQuality: 5,
    sleep: 9.0,
    socialInteractions: 25,
    physicalActivity: 'Amazing day! 2 hours hiking with friends',
    sleepDisturbances: null,
    symptoms: 'Feeling fantastic and energized',
  });

  logs.push({
    userId: testUser.id,
    date: format(subDays(now, 250), 'yyyy-MM-dd'),
    mood: 1,
    anxiety: 5,
    stress: 5,
    sleepQuality: 1,
    sleep: 3.5,
    socialInteractions: 0,
    physicalActivity: null,
    sleepDisturbances: 'Barely slept, constant worrying',
    symptoms: 'Severe headache, nausea, extreme fatigue',
  });

  logs.push({
    userId: testUser.id,
    date: format(subDays(now, 300), 'yyyy-MM-dd'),
    mood: 3,
    anxiety: 3,
    stress: 3,
    sleepQuality: 3,
    sleep: 7.0,
    socialInteractions: 5,
    physicalActivity: '30 minutes walking',
    sleepDisturbances: 'Woke up once',
    symptoms: null,
  });

  await prisma.dailyLog.createMany({
    data: logs,
  });

  console.log(`✅ Created ${logs.length} test logs`);
  console.log('\n📊 Test Data Summary:');
  console.log(`   - Hourly entries (last 24h): 8`);
  console.log(`   - Daily entries (last 30 days): 30`);
  console.log(`   - Every 2 days (31-90 days): ~30`);
  console.log(`   - Weekly entries (91-365 days): ~40`);
  console.log(`   - Edge cases (extreme values): 3`);
  console.log(`   - Total: ${logs.length} logs\n`);

  console.log('🎯 Coverage:');
  console.log('   ✓ Pagination testing (>20 logs)');
  console.log('   ✓ All chart periods (1d, 7d, 14d, 30d, 90d, 1y, all)');
  console.log('   ✓ Hourly view (last 24h with hour timestamps)');
  console.log('   ✓ Empty field testing (null and "" values)');
  console.log('   ✓ Edge cases (extreme good/bad/neutral days)');
  console.log('   ✓ All metrics variation (mood, anxiety, stress, sleep, social)\n');

  console.log(`� Test User: ${testUser.email}`);
  console.log(`   ID: ${testUser.id}`);
  console.log(`   Google ID: ${testUser.googleId}\n`);

  console.log('✨ Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });