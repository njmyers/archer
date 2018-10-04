type SystemCtl = {
  service: string,
  state: 'enable' | 'disable' | 'start' | 'reload' | 'restart' | 'stop',
};

type Ln = {
  target: string,
  destination: string,
  sudo: boolean,
};

type File = {
  path: string,
  mode: 'replace' | 'modify',
  sudo: boolean,
};

type Exec = {
  command: string,
  sudo: boolean,
};

type Task = {
  /** aur packages and dependencies associated with this program */
  aur: Array<string>,
  /** pacman packages and dependencies associated with this program */
  pacman: Array<string>,
  /** list of systemd tasks to enable **/
  systemctl: Array<SystemCtl>,
  /** list of symlinks to create or remove **/
  ln: Array<Ln>,
  /** files to modify **/
  files: Array<File>,
  /** miscellaneous commands to execute */
  exec: Array<Exec>,
};

export default Task;
