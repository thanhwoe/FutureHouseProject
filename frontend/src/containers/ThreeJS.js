import React from 'react'
import { Button, Card, Container, Icon, Image, Segment, Loader, Dimmer, Message } from 'semantic-ui-react'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as THREE from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader';
import { THREEx } from 'threex-domevents'
import { localhost } from '../constants'
var freedomMesh;
var freedomMesh2;
var scene;
var planeSize = 40;
var isPause = false

class ThreeScene extends React.Component {
    componentDidMount() {


        const width = this.mount.clientWidth;
        const height = this.mount.clientHeight;


        // camera
        const fov = 45;
        const aspect = 2;
        const near = 0.1;
        const far = 100;
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        // this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        this.camera.position.set(15, 5, 15);

        // render
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setClearColor("#263238"); //#ffffff
        this.renderer.setSize(width, height);
        this.mount.appendChild(this.renderer.domElement);


        scene = new THREE.Scene();
        scene.background = new THREE.Color(0xbfe3dd);

        // controller
        const controls = new OrbitControls(this.camera, this.renderer.domElement);
        controls.target.set(0, 5, 0);
        controls.update();

        // light
        const light = new THREE.HemisphereLight(0xffffff, 0x444444);
        light.position.set(0, 20, 0);
        scene.add(light);
        const light2 = new THREE.DirectionalLight(0xffffff);
        light2.position.set(5, 10, 2);
        scene.add(light2);
        scene.add(light2.target);

        var mtlFile
        var objFile
        var daeFile
        var fbxFile
        // var mtlFile = this.props.mtlData
        // var objFile=this.props.objData
        var { files } = this.props
        console.log(files)
        var re = /(?:\.([^.]+))?$/;
        var removS= /.*(?= ? )/;
        var regex =/(?<=\.)(.*?)(?=\?)/
        // console.log(files)
        files.map(file => {
            var ext = regex.exec(file.file)[1];
            var ext2= re.exec(ext)[1]
            console.log(ext2)
            switch (ext2) {
                case "mtl":
                    mtlFile = file.file
                    break;
                case "obj":
                    objFile = file.file
                    break;
                case "dae":
                    daeFile = file.file
                    break;
                case "fbx":
                    fbxFile = file.file
                    break;
                default:
                    break;
            }
            // console.log(ext)
        })
        // load material
        if (daeFile != undefined) {
            this.handleDAELoader(daeFile)

        } else if (mtlFile != undefined) {
            this.handleOBJLoader(mtlFile, objFile)

        } else if (fbxFile != undefined) {
            this.handleFBXLoader(fbxFile)
        } else {
            alert("No file 3D found")
        }

        // this.mount.addEventListener('mousedown', this.onDocumentMouserDown,false)
        this.start();


    }
    // onDocumentMouserDown = (event) => {
    //     event.preventDefault()
    //     console.log("aaa")
    // }
    handleFBXLoader = (fbxFile) => {
        var fbxLoader = new FBXLoader();
        fbxLoader.load(fbxFile,
            (fbx) => {
                freedomMesh2 = fbx.scene;
                scene.add(freedomMesh2);

            },
            function (xhr) {
                console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
            },
            // called when loading has errors
            function (error) {
                console.log("An error happened" + error);
            }
        )
    }
    handleDAELoader = (daeFile) => {
        var daeLoader = new ColladaLoader();
        daeLoader.load(daeFile,
            (dae) => {
                freedomMesh2 = dae.scene;
                scene.add(freedomMesh2);

                // called when the resource is loaded
                //   console.log(gltf.scene)
            },
            function (xhr) {
                console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
            },
            // called when loading has errors
            function (error) {
                console.log("An error happened" + error);
            }
        )
    }
    handleOBJLoader = (mtlFile, objFile) => {
        var mtlLoader = new MTLLoader();
        mtlLoader.load(mtlFile, function (materials) {
            materials.preload();
            console.log("loaded Material");

            // load Object
            var objLoader = new OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.load(
                objFile,
                function (object) {

                    freedomMesh = object;
                    // freedomMesh.position.setY(3); //or  this
                    // freedomMesh.scale.set(0.02, 0.02, 0.02);
                    scene.add(freedomMesh);
                },
                function (xhr) {
                    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
                },
                // called when loading has errors
                function (error) {
                    console.log("An error happened" + error);
                }
            );
        });
    }
    componentWillUnmount() {
        this.stop();
        this.mount.removeChild(this.renderer.domElement);
    }

    start = () => {
        if (!this.frameId) {
            this.frameId = requestAnimationFrame(this.animate);
        }
    };
    stop = () => {
        cancelAnimationFrame(this.frameId);
    };
    animate = () => {
        if (isPause == true) {
            const btn = document.getElementById('btn-handle');
            btn.innerHTML = 'ReStart';
            //     if (freedomMesh2) freedomMesh2.rotation.z = 0;
            // if (freedomMesh) freedomMesh.rotation.y = 0;
            // // if(!isPause) return;
            // this.renderScene();
            // this.frameId = window.requestAnimationFrame(this.animate);
            return;
        } else {
            const btn = document.getElementById('btn-handle');
            btn.innerHTML = 'Pause';
            if (freedomMesh2) freedomMesh2.rotation.z += 0.01;
            if (freedomMesh) freedomMesh.rotation.y += 0.01;
            // if(!isPause) return;
            this.renderScene();
            this.frameId = window.requestAnimationFrame(this.animate);
        }

    };
    pauseanimate = () => {
        isPause = !isPause
        this.animate()
        // this.renderScene();
        // this.frameId = window.requestAnimationFrame(this.animate);
    };
    renderScene = () => {
        if (this.renderer) this.renderer.render(scene, this.camera);
    };

    onLoad = texture => {
        // var objGeometry = new THREE.PlaneGeometry(planeSize, planeSize);
        // var objMaterial = new THREE.MeshPhongMaterial({
        //     map: texture,
        //     side: THREE.DoubleSide
        // });

        // const mesh = new THREE.Mesh(objGeometry, );
        // mesh.rotation.x = Math.PI * -.5;
        // scene.add(mesh);


        // mesh.scale.set( 2, 1, 1 )
        this.renderScene();
        //start animation
        this.start();
    };

    onProgress = xhr => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    };

    // Function called when download errors
    onError = error => {
        console.log("An error happened" + error);
    };

    render() {
        return (
            <div>
                <div
                    style={{ width: "1155px", height: "90vh" }}
                    ref={mount => {
                        this.mount = mount;
                    }}
                />
                {/* <div id="message3D"  style={{ "position": "absolute" }}>
                    <p>Message - hidden</p>
                </div> */}
                <Button style={{position:'absolute', top:'0'}} onClick={() => this.pauseanimate()} id="btn-handle">Pause</Button>
            </div>
        );
    }
}

export default ThreeScene;