let data = [];
let inputs = returnInputs();
const w = new WCG();
w.background('#002')
let starts = [];
for (let i = 0; i < 10; i++) {
    starts.push({
        x:Math.random() * w.canvas.width,
        y:Math.random() * w.canvas.height,
        r:Math.random() * 5
    })
}
load();
read();

function returnInputs() {
    
    return document.querySelectorAll('input')

}

let dataPro = [];
function create() {
        

    let newData = {

        title:inputs[0].value,
        des:inputs[1].value,
        time:inputs[2].value
    }
    dataPro.push(newData);
    localStorage.setItem('data',JSON.stringify(dataPro));
    
    load();
    read();

    clear();
}

function read() {

    const tasks = document.querySelector('.tasks');
    let inner = '';

    const now = new Date().toLocaleString();

    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        inner += `
        <div class="task">
            <p>Title:${element.title}</p>
            <p>Des:${element.des}</p>
            <p>Time:${element.time}</p>
            <button onclick="remove(${i})">Delete</button>
        </div>
        `;

        if (element.time === now) {
            
            const synth = window.speechSynthesis;
            let text = element.title;
            const utterThis = new SpeechSynthesisUtterance(text);
            synth.speak (utterThis)

            alert(`
            Title:${element.title}
            Des:${element.des}
            Time:${element.time}
            `);
        }

    }

    tasks.innerHTML = inner;
}

function load() {

    if (localStorage.getItem('data')) {

        data = JSON.parse(localStorage.data)
            
    }else{

        data = [];

    }
}

function remove(index) {

    data.splice(
        index,
        1
    );

    localStorage.data = JSON.stringify(data)

    read();
}

function clear() {

    inputs[0].value = '';
    inputs[1].value = '';
    inputs[2].value = '';

}

// localStorage.clear()
let speed = .1;
function engine() {
    
    w.clear();
    w.background('#000');
    starts.forEach(star=>{
        star.y += speed;
        if (star.y + star.r + speed >= w.canvas.height) {
            
            speed = -speed;

        }
        star.x += speed;
        if (star.x + star.r + speed >= w.canvas.width) {
            
            speed = -speed;

        }
        w._fillStyle = '#fff';
        w.circle(star.x,star.y,star.r)
    });

    requestAnimationFrame(engine);
}

engine();

