const { execSync } = require('child_process');

try {
    console.log('Cleaning Watchman...');
    execSync('watchman watch-del-all', { stdio: 'inherit' });

    console.log('Shutting down Watchman server...');
    execSync('watchman shutdown-server', { stdio: 'inherit' });

    console.log('Removing Metro Bundler cache...');
    execSync('rm -rf /tmp/metro-*', { stdio: 'inherit' });

    console.log('Cleaning npm cache...');
    execSync('npm cache clean --force', { stdio: 'inherit' });

    console.log('Removing node_modules...');
    execSync('rm -rf node_modules', { stdio: 'inherit' });

    console.log('Cleaning Expo cache...');
    execSync('expo cache:clear', { stdio: 'inherit' });

    console.log('Removing .expo...');
    execSync('rm -rf .expo', { stdio: 'inherit' });

    console.log('Reinstalling node_modules...');
    execSync('npm install', { stdio: 'inherit' });

    console.log('Cleanup complete!');
} catch (error) {
    console.error(
        'An error occurred during the cleanup process:',
        error.message
    );
    process.exit(1);
}
