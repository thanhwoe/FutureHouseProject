import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, FlatList, Platform, StatusBar, Dimensions, TextInput } from 'react-native';
import { icons } from '../constants';
import { ExpoWebGLRenderingContext, GLView } from 'expo-gl';
import { Renderer } from 'expo-three';
import * as THREE from "three";
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader';
import { localhost } from '../apiURL';

import OrbitControlsView from 'expo-three-orbit-controls';

var freedomMesh;
var freedomMesh2;
class Three extends React.Component {
    state = { camera: null }
    // this is called by the ExpoGraphic.View once it's initialized
    _onGLContextCreate = async (gl) => {
        // 1. Scene
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0xbfe3dd);
        // 2. Camera
        const camera = new THREE.PerspectiveCamera(
            75,
            gl.drawingBufferWidth / gl.drawingBufferHeight,
            0.1,
            100
        );

        // 3. Renderer
        const renderer = new Renderer({ gl });
        renderer.setClearColor("#263238");
        renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

        camera.position.set(0, 5, 15);
        this.setState({ camera: camera });
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
        var re = /(?:\.([^.]+))?$/;
        var regex =/(?:\.)(.*?)(?=\?)/

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
            // alert("No file 3D found")
            console.log('none')
        }
        const animate = () => {
            if (freedomMesh2) freedomMesh2.rotation.z += 0.01;
            if (freedomMesh) freedomMesh.rotation.y += 0.01;
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
            gl.endFrameEXP();
        };

        // const animate = () => {
        //     renderer.render(scene, camera)
        //     requestAnimationFrame(animate);
        //     gl.endFrameEXP()
        // }
        if (!this.frameId) {
            this.frameId = requestAnimationFrame(animate);
        }
        animate()
    }
    stop = () => {
        cancelAnimationFrame(this.frameId);
        // console.log('aaaas')
    };
    componentWillUnmount() {
        this.stop();
    }


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
                    scene.add(object);
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

    render() {
        return (
            <OrbitControlsView style={styles.orbitView} camera={this.state.camera}>
                <GLView style={styles.mainView} onContextCreate={this._onGLContextCreate} />
            </OrbitControlsView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    mainView: {
        position: 'absolute',
        // marginTop: StatusBar.currentHeight,
        width: '100%',
        height: '100%',
    },
    orbitView: {
        // marginTop: StatusBar.currentHeight,
        position: 'absolute',
        width: '100%',
        height: 500,
    }

})

export default Three;
