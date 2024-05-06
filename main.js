import * as THREE from "three";
import { OrbitControls   } from "three/examples/jsm/controls/OrbitControls.js"
import gsap from "gsap"
const scene = new THREE.Scene();
const sizes  = {
    width: window.innerWidth,
    height: window.innerHeight
}

        const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);
        camera.position.z = 10;

        const geometry = new THREE.SphereGeometry(4, 64, 64);
        const material = new THREE.MeshStandardMaterial({ color: "#00ff83",
            roughness: 0.5
         });
        const sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);

         const newlight = new THREE.AmbientLight("white",20)
         newlight.position.set(0,0,-50)
         scene.add(newlight)
         newlight.intensity = 0.09


        const pointLight = new THREE.PointLight("lightblue", 100);
        pointLight.position.set(0, 10, 10);
        pointLight.intensity = 500
        scene.add(pointLight);

       


        const canvas = document.querySelector('.webgl');
        const renderer = new THREE.WebGLRenderer({ canvas });
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(3)

      
        const controls = new OrbitControls(camera,canvas)
        controls.enableDamping = true
        controls.enablePan = false
        controls.enableZoom = false
        controls.autoRotate = true
        controls.autoRotateSpeed = 22
        window.addEventListener('resize', () => {
            sizes.width = window.innerWidth
            sizes.height = window.innerHeight
            camera.updateProjectionMatrix()
            camera.aspect = sizes.width/sizes.height
            renderer.setSize(sizes.width,sizes.height)
        } )
        function animate() {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
            controls.update()
        }

        animate();

        const tl = gsap.timeline({defaults: {duration: 1 }})
        tl.fromTo(sphere.scale, {z:0 , x:0 , y:0}, {z:1,x:1,y:1})
        tl.fromTo('nav',{ y:"-100%" },{ y:"0%" })
        tl.fromTo('h1',{opacity:0},{opacity:1})

        let mouseDown = false;
        let rgb = [];
        window.addEventListener('mousedown',()=>(mouseDown=true))
        window.addEventListener('mouseup',()=>(mouseDown=false))

        window.addEventListener('mousemove',(e)=>{
            if(mouseDown){
rgb = [
    Math.round((e.pageX/sizes.width)*255),
    Math.round((e.pageY/sizes.width)*255),
    120,    
]
let newColor = new THREE.Color(`rgb(${rgb.join(",")})`)
gsap.to(sphere.material.color,{r:newColor.r,g:newColor.g,b:newColor.b}) 
}
        })