import { MaintenanceService } from '../services/maintenance.service.js';
import { disconnectDatabase } from '../database/prisma.js';
import { logger } from '../utils/logger.js';

async function main() {
  logger.info('Running AuthForge standalone database maintenance script...');
  try {
    const report = await MaintenanceService.runMaintenance();
    console.log('\n=======================================');
    console.log('AuthForge Maintenance Report');
    console.log('=======================================');
    console.log(`Expired OTP Challenges Cleaned       : ${report.otpChallengesCleaned}`);
    console.log(`Expired Reset Authorizations Cleaned : ${report.resetAuthorizationsCleaned}`);
    console.log(`Expired Security Events Cleaned      : ${report.securityEventsCleaned}`);
    console.log(`Expired Sessions Cleaned             : ${report.sessionsCleaned}`);
    console.log(`Old Revoked Tokens Cleaned           : ${report.refreshTokensCleaned}`);
    console.log(`Completed At                         : ${report.timestamp.toISOString()}`);
    console.log('=======================================\n');
  } catch (error) {
    logger.error('Fatal error during maintenance script execution:', error);
    process.exit(1);
  } finally {
    await disconnectDatabase();
  }
}

main();
