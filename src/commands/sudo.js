import createSpawn from './create-spawn';

// do not export with accept-args like other commands
// this is because sudo is really just a stub
// we are never going to run sudo without an additional command
export default createSpawn('sudo');
