// Minimal interactive terminal behavior
const output = document.getElementById('output');
const inputEl = document.getElementById('input');
const cursor = document.querySelector('.cursor');

const commands = {
  whoami: "Bhavesh1116",
  about: "Name: Bhavesh\nRole: Developer / Config enthusiast\nInterests: Dotfiles, UI, GitHub Pages, creative READMEs",
  projects: "Repo: https://github.com/Bhavesh1116/Bhavesh1116\n(Explore my config files and README)",
  "open-site": "Opening site... Redirecting in 800ms"
};

function print(text){
  const pre = document.createElement('pre');
  pre.textContent = text;
  pre.style.whiteSpace = 'pre-wrap';
  output.appendChild(pre);
  output.scrollIntoView({behavior:'smooth', block:'end'});
}

function run(cmd){
  if(!cmd) return;
  if(commands[cmd]){
    print("$ " + cmd);
    const res = commands[cmd];
    print(res);
    if(cmd === 'open-site'){
      setTimeout(()=> window.open('https://bhavesh1116.github.io/Bhavesh1116/','_blank'), 800);
    }
  } else if(cmd === 'help') {
    print("$ help");
    print("Available commands: " + Object.keys(commands).join(', '));
  } else {
    print("$ " + cmd);
    print("Command not found: " + cmd + "  (try 'help')");
  }
}

// wire up buttons
document.querySelectorAll('.controls button').forEach(b=>{
  b.addEventListener('click', ()=> {
    const cmd = b.getAttribute('data-cmd');
    typeAndRun(cmd);
  });
});

// small typing simulation then run
function typeAndRun(text){
  inputEl.textContent = '';
  let i=0;
  const id = setInterval(()=>{
    inputEl.textContent += text[i] || '';
    i++;
    if(i>text.length){
      clearInterval(id);
      setTimeout(()=> {
        run(text);
        inputEl.textContent = '';
      }, 220);
    }
  }, 40);
}

// initial demo typing
setTimeout(()=> typeAndRun('whoami'), 600);
