const container = document.getElementById('anatomyVis');

// Create the anatomy container
const diagramContainer = document.createElement('div');
diagramContainer.id = 'diagramContainer';
diagramContainer.style.position = 'relative';
diagramContainer.style.width = '500px';
diagramContainer.style.margin = 'auto';

// Add the turtle image
const img = document.createElement('img');
img.src = 'https://github.com/summ0001/FIT3179/blob/main/Images/turtle_anatomy.jpg';
img.alt = 'Sea Turtle';
img.style.width = '100%';
img.style.display = 'block';
img.style.borderRadius = '12px';
diagramContainer.appendChild(img);

// Add the SVG overlay
const svgNS = "http://www.w3.org/2000/svg";
const svg = document.createElementNS(svgNS, 'svg');
svg.setAttribute('style', 'position:absolute;top:0;left:0;width:100%;height:100%;');

// Define hover points as small dots
const points = [
    { id: 'skull', cx: 110, cy: 60, info: "Skull: made-up of fused bones, functions to protect the brain and sensory structures." },
    { id: 'beak', cx: 25, cy: 60, info: "Beak: modification of the jaw used for scraping, crushing, tearing, or biting." },
    { id: 'eye', cx: 75, cy: 57, info:"Eye"},
    { id: 'mouth', cx: 45, cy: 80, info: "Mouth: toothless, although, green turtles have a serrated beak." },
    { id: 'claw', cx: 230, cy: 340, info: "Claw" },
    { id: 'front flipper', cx: 320, cy: 325, info: "Front Flipper: functions both as a wing (lift) and a propeller (thrust)." },
    { id: 'plastron', cx: 375, cy: 240, info: "Plastron: the ventral, or lower side, of the shell. Joined to the carapace by cartilage." },
    { id: 'rear flipper', cx: 475, cy: 300, info: "Rear Flipper: function as rudders for steering and nest digging." },
    { id: 'scute', cx: 360, cy: 150, info: "Scute: single keratinuous scales overlaying the boby carapace. The number and arrangement of the scutes helps to identify one species of sea turtles from another." },
    { id: 'shell', cx: 250, cy: 80, info: "Shell: serves to protect internal organs. Both the shell and the body in general are tapered to be as hydrodynamic as possible." },
    { id: 'carapace', cx: 300, cy: 80, info: "Carapace: the dorsal, or upper side, of the shell. In all but the leatherback, the backbone and ribs of the turtle are fused to form the carapace." },
];

const tooltip = document.createElement('div');
tooltip.id = 'tooltip';
tooltip.style.position = 'absolute';
tooltip.style.background = 'rgba(0,0,0,0.8)';
tooltip.style.color = 'white';
tooltip.style.padding = '5px 10px';
tooltip.style.borderRadius = '5px';
tooltip.style.pointerEvents = 'none';
tooltip.style.display = 'none';
tooltip.style.fontFamily = 'Poppins, sans-serif';
tooltip.style.fontSize = '0.9rem';
tooltip.style.zIndex = '10';
diagramContainer.appendChild(tooltip);

// Create the dot shapes
points.forEach(point => {
    const dot = document.createElementNS(svgNS, 'circle');
    dot.setAttribute('cx', point.cx);
    dot.setAttribute('cy', point.cy);
    dot.setAttribute('r', 6); // small dot radius
    dot.setAttribute('fill', '#00796b');
    dot.setAttribute('id', point.id);
    dot.style.cursor = 'pointer';
    dot.style.opacity = '0.7';

    dot.addEventListener('mousemove', (e) => {
        const rect = diagramContainer.getBoundingClientRect();
        tooltip.style.left = (e.clientX - rect.left + 10) + 'px';
        tooltip.style.top = (e.clientY - rect.top + 10) + 'px';
        tooltip.innerText = point.info;
        tooltip.style.display = 'block';
    });

    dot.addEventListener('mouseleave', () => {
        tooltip.style.display = 'none';
    });

    svg.appendChild(dot);
});

diagramContainer.appendChild(svg);
container.appendChild(diagramContainer);
