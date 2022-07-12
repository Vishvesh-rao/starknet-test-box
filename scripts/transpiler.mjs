// import { exec } from 'child_process';

// /**
//  * Execute simple shell command (async wrapper).
//  * @param {String} cmd
//  * @return {Object} { stdout: String, stderr: String }
//  */
// async function sh(cmd) {
//   return new Promise(function (resolve, reject) {
//     exec(cmd, (err, stdout, stderr) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve({ stdout, stderr });
//       }
//     });
//   });
// }

// async function main() {
//   let { stdout } = await sh('./l2.py');
//   for (let line of stdout.split('\n')) {
//     console.log(`ls: ${line}`);
//   }
// }

// main();
// import { exec } from 'child_process';

// /**
//  * Execute simple shell command (async wrapper).
//  * @param {String} cmd
//  * @return {Object} { stdout: String, stderr: String }
//  */
// function l2_compile() {
//   return new Promise(function (resolve, reject) {
//     exec("./l2.py", (err, stdout, stderr) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve({ stdout, stderr });
//       }
//     });
//   });
// }

// function main(){
// let { stdout } = l2_compile();
// for (let line of stdout.split('\n')) {
//       console.log(`ls: ${line}`);
//     }
// }

// main();

import { exec } from 'child_process';

/**
 * Execute simple shell command (async wrapper).
 * @param {String} cmd
 * @return {Object} { stdout: String, stderr: String }
 */
async function l2_compile() {
  return new Promise(function (resolve, reject) {
    exec("./cairo_transpiler.py", (err, stdout, stderr) => {
      if (err) {
        reject(err);
      } else {
        resolve({ stdout, stderr });
      }
    });
  });
}

export{ l2_compile }
// async function main() {
//   let { stdout } = await sh('./l2.py');
//   for (let line of stdout.split('\n')) {
//     console.log(`ls: ${line}`);
//   }
// }

// main();
