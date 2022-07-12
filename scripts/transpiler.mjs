import { exec } from 'child_process';

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

