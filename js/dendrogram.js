document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("quizModal");
    const openBtn = document.getElementById("openQuizBtn");
    const closeBtn = document.querySelector(".closeBtn");

    openBtn.onclick = () => {
        modal.style.display = "block";
    };

    closeBtn.onclick = () => {
        modal.style.display = "none";
        location.reload();
    };

    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
            location.reload();
        }
    };

    const questions = [
        {
            text: "Q1) What type of shell does the turtle have?",
            options: [
                { img: "Images/image1.png", text: "Carapace ridges, no scales", next: "Leatherback Turtle" },
                { img: "Images/image2.png", text: "Carapace scales, 4 pair costal", next: "Question2" },
                { img: "Images/image3.png", text: "Carapace scales, 5 pair costal, red-brown to brown", next: "Loggerhead Turtle" },
                { img: "Images/image4.png", text: "Carapace scales, 6 pair costal, grey-green", next: "Olive Ridley Turtle" }
            ]
        },
        {
            text: "Q2) How many pairs of pre-frontal scales does the turtle have?",
            options: [
                { img: "Images/image5.png", text: "2 pair pre-frontal, thick overlapping scales", next: "Hawksbill Turtle" },
                { img: "Images/image6.png", text: "1 pair pre-frontal, no thick overlapping scales", next: "Question3" }
            ]
        },
        {
            text: "Q3) How is the carapace dome?",
            options: [
                { img: "Images/image7.png", text: "Low domed with upturned edges, olive grey", next: "Flatback Turtle" },
                { img: "Images/image8.png", text: "High domed, light to dark green with mottling", next: "Green Turtle" }
            ]
        }
    ];

    const results = {
        "Leatherback Turtle": "Largest turtle species, eats jellyfish.",
        "Loggerhead Turtle": "Feeds mainly on crustaceans and mollusks.",
        "Olive Ridley Turtle": "Omnivorous, eats crabs, shrimps, algae.",
        "Hawksbill Turtle": "Feeds mostly on sponges and coral reef invertebrates.",
        "Flatback Turtle": "Found in northern Australia, feeds on sea cucumbers and jellyfish.",
        "Green Turtle": "Primarily herbivorous, feeds on seagrass and algae."
    };

    const quizDiv = document.getElementById("quiz");
    const startBtn = document.getElementById("startBtn");

    startBtn.onclick = () => showQuestion(0);

    function showQuestion(index) {
        const q = questions[index];
        quizDiv.innerHTML = `<div class="question"><h2>${q.text}</h2></div>`;
        q.options.forEach(opt => {
            const btn = document.createElement("div");
            btn.className = "option";
            btn.innerHTML = `<img src="${opt.img}" alt="${opt.text}" /><p>${opt.text}</p>`;
            btn.onclick = () => {
                if (opt.next.startsWith("Question")) {
                    const nextIndex = parseInt(opt.next.replace("Question", "")) - 1;
                    showQuestion(nextIndex);
                } else {
                    showResult(opt.next);
                }
            };
            quizDiv.appendChild(btn);
        });
    }

    function showResult(name) {
        const resultImg = {
            "Leatherback Turtle": "Images/leatherback.png",
            "Loggerhead Turtle": "Images/loggerhead.png",
            "Olive Ridley Turtle": "Images/oliveridley.png",
            "Hawksbill Turtle": "Images/hawksbill.png",
            "Flatback Turtle": "Images/flatback.png",
            "Green Turtle": "Images/green.png"
        };

        quizDiv.innerHTML = `
            <div class="result">
                <h2>${name}</h2>
                <img src="${resultImg[name]}" alt="${name}" style="width:250px; height:auto; border-radius:8px; margin:15px 0;" />
                <p>${results[name]}</p>
                <button id="restartBtn">Start Over</button>
            </div>
        `;

        document.getElementById("restartBtn").onclick = () => {
            quizDiv.innerHTML = `<button id="startBtn">Start Identification</button>`;
            document.getElementById("startBtn").onclick = () => showQuestion(0);
        };
    }
});