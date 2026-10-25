/* =====================================
   3D ROTATING EARTH
===================================== */

const container = document.getElementById("globe");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
);

camera.position.z = 2.7;


/* Renderer */

const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
});

renderer.setSize(
    container.clientWidth,
    container.clientHeight
);

renderer.setPixelRatio(window.devicePixelRatio);

container.appendChild(renderer.domElement);


/* =====================================
   EARTH
===================================== */

const earthGeometry = new THREE.SphereGeometry(
    1,
    64,
    64
);


/* Earth texture */

const textureLoader = new THREE.TextureLoader();

const earthTexture = textureLoader.load(
    "https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg"
);


const earthMaterial = new THREE.MeshPhongMaterial({
    map: earthTexture,
    shininess: 15
});


const earth = new THREE.Mesh(
    earthGeometry,
    earthMaterial
);

scene.add(earth);


/* =====================================
   ATMOSPHERE
===================================== */

const atmosphereGeometry =
    new THREE.SphereGeometry(
        1.05,
        64,
        64
    );


const atmosphereMaterial =
    new THREE.MeshBasicMaterial({
        color: 0x48d9ff,
        transparent: true,
        opacity: 0.12,
        side: THREE.BackSide
    });


const atmosphere =
    new THREE.Mesh(
        atmosphereGeometry,
        atmosphereMaterial
    );


scene.add(atmosphere);


/* =====================================
   LIGHTING
===================================== */

const ambientLight =
    new THREE.AmbientLight(
        0xffffff,
        1.2
    );

scene.add(ambientLight);


const directionalLight =
    new THREE.DirectionalLight(
        0xffffff,
        2
    );

directionalLight.position.set(
    5,
    3,
    5
);

scene.add(directionalLight);


/* =====================================
   STAR / AIR PARTICLES
===================================== */

const particleGeometry =
    new THREE.BufferGeometry();

const particleCount = 800;

const positions = new Float32Array(
    particleCount * 3
);


for (let i = 0; i < particleCount * 3; i++) {

    positions[i] =
        (Math.random() - 0.5) * 6;
}


particleGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(
        positions,
        3
    )
);


const particleMaterial =
    new THREE.PointsMaterial({
        color: 0x62cfd9,
        size: 0.012,
        transparent: true,
        opacity: 0.6
    });


const particles =
    new THREE.Points(
        particleGeometry,
        particleMaterial
    );


scene.add(particles);


/* =====================================
   MOUSE MOVEMENT
===================================== */

let mouseX = 0;
let mouseY = 0;


document.addEventListener(
    "mousemove",
    function(event) {

        mouseX =
            (event.clientX / window.innerWidth) - 0.5;

        mouseY =
            (event.clientY / window.innerHeight) - 0.5;
    }
);


/* =====================================
   ANIMATION
===================================== */

function animate() {

    requestAnimationFrame(animate);


    /* Earth rotation */

    earth.rotation.y += 0.0025;


    /* Atmosphere rotation */

    atmosphere.rotation.y += 0.001;


    /* Particle movement */

    particles.rotation.y += 0.0005;


    /* Mouse effect */

    earth.rotation.x +=
        (mouseY * 0.15 - earth.rotation.x) * 0.02;


    earth.rotation.y +=
        (mouseX * 0.15) * 0.002;


    renderer.render(
        scene,
        camera
    );
}


animate();


/* =====================================
   RESPONSIVE GLOBE
===================================== */

window.addEventListener(
    "resize",
    function() {

        camera.aspect =
            container.clientWidth /
            container.clientHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(
            container.clientWidth,
            container.clientHeight
        );
    }
);


/* =====================================
   PASSWORD SHOW / HIDE
===================================== */

function togglePassword() {

    const password =
        document.getElementById("password");

    if (password.type === "password") {

        password.type = "text";

    } else {

        password.type = "password";

    }
}


/* =====================================
   LOGIN
===================================== */

document
    .getElementById("loginForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const email =
                document.getElementById("email").value;

            const password =
                document.getElementById("password").value;


            if (
                email.trim() === "" ||
                password.trim() === ""
            ) {

                alert(
                    "Please enter email and password."
                );

                return;
            }


            /*
             * After successful login,
             * redirect to dashboard.html
             */

            window.location.href =
                "dashboard.html";
        }
    );


/* =====================================
   FLOATING PARTICLES
===================================== */

const particleContainer =
    document.querySelector(".particles");


for (let i = 0; i < 35; i++) {

    const particle =
        document.createElement("div");

    particle.classList.add("particle");

    particle.style.left =
        Math.random() * 100 + "%";

    particle.style.animationDuration =
        (5 + Math.random() * 8) + "s";

    particle.style.animationDelay =
        Math.random() * 5 + "s";

    particleContainer.appendChild(
        particle
    );
}