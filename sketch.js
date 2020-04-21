var links;
var headers;
let prevLI = {};
let lastLI = {};
let list;
function setup() {
    createCanvas(300, 300);

    links = selectAll(".hover-red");
    links.forEach(
        (link) => {
            bindLink(link);
        }
    );

    list = select("#items");
    const c = list.child();
    list.elt.removeChild(c[c.length - 1]);

    // lastLI.elt = list.child()[1];
    bindCreateList(list);

    // headers.forEach(
    //     (h) => {
    //         bindHeaderCreate(h);
    //     }
    // );
    
}


function bindCreateList(l) {
    l.mouseOut((e) => {
        const c = list.child();
        console.log("out");
        console.log(c);
        if(c[c.length - 1] === e.target) {
            console.log('adding');
            const newLI = createElement("li", "new li");
            l.child(newLI);  
        } else {
            list.elt.removeChild(c[c.length - 1]);
        }

    });

    // l.mouseOver((e) => {
    //     const c = list.child();

    //     console.log("over");

    //     if(c[c.length - 2] === e.target) {
    //         list.elt.removeChild(c[c.length - 1]);
    //     }

    // });
}



function bindHeaderCreate(h) {
    h.mouseOut(
        (e) => {
            console.log("HI");
            e.stopPropagation();
            h.mouseOut(false);
            bindHeaderDestroy(h);

            const level = parseFloat(h.elt.tagName[1]);

            if(level <= 5 && h.child().length < 2) {
                const next = level + 1;
                const newH = createElement("h" + next, "head level " + next);
                h.child(newH);
                bindHeaderCreate(newH);

            }
            
        }
    );

}

function bindHeaderDestroy(h) {
    h.mouseOver(
        (e) => {
            console.log("over");
            e.stopPropagation();
            console.log(h.child());
            h.mouseOver(false);
            h.child()[0].remove();
        }
    ); 
}

function bindLink(link) {
    link.mousePressed(
        (e) => {
            const text = link.elt.innerHTML;
            const newP = createP(text);
            link.child(newP);
            e.stopPropagation();
            bindLink(newP);

            // console.log(link);
        }
    );
}




function draw() {
    background(0);
}