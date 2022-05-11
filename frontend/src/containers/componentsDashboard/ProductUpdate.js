import React, { Component, useState, useEffect } from 'react';
import { useHistory, useParams, Link, withRouter, Redirect } from 'react-router-dom';
import axios from 'axios'
import { Header, Button, Divider, Container, Icon, Image, Segment, Loader, Dimmer, Message, Grid, Input, TextArea, Form } from 'semantic-ui-react'
import { productCreateURL, productUpdateURL, productDetailURL, fileDeleteURL, productDeleteURL, files3DCreateURL, imagesCreateURL, imageDeleteURL, documentDeleteURL, documentCreateURL } from '../../constants'
import { authAxios } from "../../utils"
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { UploaderComponent } from '@syncfusion/ej2-react-inputs';
const ProductUpdate = (props) => {
    const initialFormData = Object.freeze({
        title: '',
        slug: '',
        price: null,
        discount_price: null,
        category: '',
        label: '',
        description: '',
        square_foot: '',
        beds: '',
        stories: '',
        garages: '',
        baths: '',
    });
    const [formData, updateFormData] = useState(initialFormData);
    const [thumbnail, setThumbnail] = useState();
    const [mFile, setmFile] = useState();
    const [mFileUpload, setmFileUpload] = useState();
    const [mImage, setmImage] = useState();
    const [mImageUpload, setmImageUpload] = useState();
    const [mDoc, setmDoc] = useState();
    const [mDocUpload, setmDocUpload] = useState();
    var regex =/(?<=\.)(.*?)(?=\?)/
    useEffect(() => {
        handleFetchItem()
    }, [updateFormData]);
    const handleFetchItem = () => {
        authAxios
            .get(productDetailURL(props.id))
            .then((res) => {
                updateFormData({
                    ...formData,
                    ['title']: res.data.title,
                    ['price']: res.data.price,
                    ['slug']: res.data.slug,
                    ['discount_price']: res.data.discount_price,
                    ['category']: res.data.category,
                    ['label']: res.data.label,
                    ['description']: res.data.description,
                    ['square_foot']: res.data.square_foot,
                    ['beds']: res.data.beds,
                    ['stories']: res.data.stories,
                    ['garages']: res.data.garages,
                    ['baths']: res.data.baths,
                });
                setThumbnail(res.data.thumbnail)
                setmFile({
                    ['files']: res.data.files
                })
                setmDoc(res.data.document)
                setmImage(res.data.images)
                console.log(res.data);
            });
    }
    const handleChange = (e) => {
        if ([e.target.name] == 'files') {
            setmFileUpload(e.target.files);

        }
        else if ([e.target.name] == 'images') {
            setmImageUpload(e.target.files)

        }
        else if ([e.target.name] == 'document') {
            setmDocUpload(e.target.files)

        }
        else if ([e.target.name] == 'thumbnail') {
            setThumbnail(e.target.files);

        } else {
            updateFormData({
                ...formData,
                // Trimming any whitespace
                [e.target.name]: e.target.value.trim(),
            });
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(formData);

        authAxios
            .put(productUpdateURL(props.id), {
                title: formData.title,
                slug: formData.slug,
                price: formData.price,
                discount_price: formData.discount_price,
                category: formData.category,
                label: formData.label,
                description: formData.description,
                square_foot: formData.square_foot,
                beds: formData.beds,
                stories: formData.stories,
                garages: formData.garages,
                baths: formData.baths,
            })
            .then(res => {
                NotificationManager.success('Success message', 'Update success');

            })
        // history.push({
        // 	pathname: '/admin/',
        // });
        // window.location.reload();
    };

    // const handleSubmitFile = () => {
    //     let DataFile = new FormData();
    //     DataFile.append('ItemID', props.id)

    //     for (let index = 0; index < mFileUpload.length; index++) {
    //         DataFile.append('files', mFileUpload[index])
    //     }
    //     // console.log(DataFile)
    //     authAxios
    //         .post(files3DCreateURL, DataFile)
    //         .then((res) => {
    //             NotificationManager.success('Success message', 'Upload success');
    //         })
    //         .catch(err => {
    //             // console.log(err)
    //         });
    // }

    const handleDeleteFile = (id) => {
        authAxios
            .delete(fileDeleteURL(id))
            .then(res => {

                handleFetchItem()
                NotificationManager.success('Success message', 'Delete success');
            })
 
    }

    // const handleSubmitDoc = () => {
    //     let DataFile = new FormData();
    //     DataFile.append('ItemID', props.id)

    //     for (let index = 0; index < mDocUpload.length; index++) {
    //         DataFile.append('document', mDocUpload[index])
    //     }
    //     // console.log(DataFile)
    //     authAxios
    //         .post(documentCreateURL, DataFile)
    //         .then((res) => {
    //             // console.log(res)
    //             NotificationManager.success('Success message', 'Upload success');
    //         })
    //         .catch(err => {
    //             // console.log(err)
    //         });
    // }

    const handleDeleteDoc = (id) => {
        authAxios
            .delete(documentDeleteURL(id))
            .then(res => {
                handleFetchItem()
                NotificationManager.success('Success message', 'Delete success');
                // console.log(res)
            })
    }

    const handleDeleteImage = (id) => {
        authAxios
            .delete(imageDeleteURL(id))
            .then(res => {
                handleFetchItem()
                NotificationManager.success('Success message', 'Delete success');
                // console.log(res)
            })
    }

    const handleDeleteProduct = () => {
        authAxios
            .delete(productDeleteURL(props.id))
            .then(res => {
                // console.log(res)
            })
    }

    // const handleSubmitImage = () => {
    //     let DataImage = new FormData();
    //     DataImage.append('ItemID', props.id)

    //     for (let index = 0; index < mImageUpload.length; index++) {
    //         DataImage.append('images', mImageUpload[index])
    //     }
    //     console.log(DataImage)
    //     authAxios
    //         .post(imagesCreateURL, DataImage)
    //         .then((res) => {
    //             // console.log(res)
    //             NotificationManager.success('Success message', 'Upload success');
    //         })
    //         .catch(err => {
    //             console.log(err)
    //         });
    // }

    const urlFile={
        saveUrl: files3DCreateURL(props.id)
    }
    const urlImage={
        saveUrl: imagesCreateURL(props.id)
    }
    const urlDocument={
        saveUrl: documentCreateURL(props.id)
    }

    const getThumname = () => {
        if (thumbnail) {
            var Thumbname = regex.exec(thumbnail)[1]
            return Thumbname
        } else {
            return "None"
        }
    }

    return (
        <Grid container>
            <Grid.Row columns={1}>
                <Grid.Column>

                </Grid.Column>
            </Grid.Row>
            <Form>
                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                            <Header>Update</Header>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={11} className="border-css">
                            <Header>General Infomation</Header>
                            <p>Title</p>
                            <Input placeholder='Title' name="title" fluid onChange={handleChange} value={formData.title} />
                            <br />
                            <p>Slug</p>
                            <Input placeholder='Slug' name="slug" fluid value={formData.slug} onChange={handleChange} />
                            <br />
                            <p>Description</p>
                            <TextArea placeholder='Description' name="description" onChange={handleChange} value={formData.description} />
                        </Grid.Column>
                        <Grid.Column width={1} ></Grid.Column>

                        
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={4} className="border-css" >
                            <Header>Stats</Header>
                            <Input label={{ tag: true, content: 'Square meter' }} labelPosition='right' name='square_foot' placeholder='Square meter' onChange={handleChange} value={formData.square_foot} style={{ width: '100px', marginBottom: '10px' }} />
                            <br />
                            <Input label={{ tag: true, content: 'Beds' }} labelPosition='right' name='beds' placeholder='Beds' onChange={handleChange} value={formData.beds} style={{ width: '100px', marginBottom: '10px' }} />
                            <br />
                            <Input label={{ tag: true, content: 'Garages' }} labelPosition='right' name='garages' placeholder='Garages' onChange={handleChange} value={formData.garages} style={{ width: '100px', marginBottom: '10px' }} />
                            <br />
                            <Input label={{ tag: true, content: 'Stories' }} labelPosition='right' name='stories' placeholder='Stories' onChange={handleChange} value={formData.stories} style={{ width: '100px', marginBottom: '10px' }} />
                            <br />
                            <Input label={{ tag: true, content: 'Baths' }} labelPosition='right' name='baths' placeholder='Baths' onChange={handleChange} value={formData.baths} style={{ width: '100px', marginBottom: '10px' }} />
                        </Grid.Column>
                        <Grid.Column width={1} ></Grid.Column>

                        <Grid.Column width={4} className="border-css" textAlign="center">
                            <Header>Organize Product</Header>
                            <Input list='categoryList' name="category" id="categoryInput" placeholder='Category' onChange={handleChange} value={formData.category} style={{marginBottom:"20px"}}/>
                            <datalist id='categoryList'>
                                <option value="Bungalow"></option>
                                <option value="Classical"></option>
                                <option value="Modern"></option>
                                <option value="Traditional"></option>
                                <option value="Luxury"></option>
                            </datalist>
                            <Input list='labelList' name="label" id="labelInput" placeholder='Label' onChange={handleChange} value={formData.label} />
                            <datalist id='labelList'>
                                <option value="New"></option>
                                <option value="Trending"></option>
                            </datalist>
                        </Grid.Column>
                        <Grid.Column width={1} ></Grid.Column>

                        <Grid.Column width={4} className="border-css">
                            <Header>Price</Header>
                            <p>Initial price: </p>
                            <Input iconPosition='left' placeholder='Initial price' name='price' onChange={handleChange} value={formData.price} style={{ marginBottom: '10px' }}>
                                <Icon name='dollar sign' />
                                <input />
                            </Input>
                            <br />
                            <p>Retail price: </p>
                            <Input iconPosition='left' name='discount_price' placeholder='Retail price' onChange={handleChange} value={formData.discount_price} >
                                <Icon name='dollar sign' />
                                <input />
                            </Input>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Form>

            <Grid.Row>
                <Grid.Column className="border-css" width={14}>
                    <Header>Upload</Header>
                    <Header as="h5">File</Header>
                    <UploaderComponent  asyncSettings={urlFile} allowedExtensions='.dae, .mtl, .obj, .fbx'/>
                    {/* <Form>
                        <input type="file" name="files" onChange={handleChange} multiple />
                        <Button onClick={handleSubmitFile}>Upload File</Button>
                    </Form> */}
                    <br />
                    {mFile && mFile.files.map(f => {
                        var Filename = regex.exec(f.file)[1]

                        return (
                            <div style={{ display: 'flex' }}>
                                <p>{Filename}</p>
                                <Icon name="remove" onClick={() => handleDeleteFile(f.id)} />
                            </div>
                        )
                    })}
                    <Header as="h5">Image</Header>
                    <UploaderComponent  asyncSettings={urlImage} allowedExtensions='.jpg, .png'/>
                    {/* <Form>
                        <input type="file" name="images" onChange={handleChange} multiple />
                        <Button onClick={handleSubmitImage}>Upload Image</Button>
                    </Form> */}
                    <br />
                    {mImage && mImage.map(f => {
                        var Imagename = regex.exec(f.image)[1]

                        return (
                            <div style={{ display: 'flex' }}>
                                <p>{Imagename}</p>
                                <Icon name="remove" onClick={() => handleDeleteImage(f.id)} />
                            </div>
                        )
                    })}

                    <Header as="h5">Document</Header>
                    <UploaderComponent  asyncSettings={urlDocument} allowedExtensions='.zip'/>
                    {/* <Form>
                        <input type="file" name="document" onChange={handleChange} />
                        <Button onClick={handleSubmitDoc}>Upload Document</Button>
                    </Form> */}
                    <br />
                    {mDoc && mDoc.map(f => {
                        var Docname = regex.exec(f.document)[1]
                        return (
                            <div style={{ display: 'flex' }}>
                                <p>{Docname}</p>
                                <Icon name="remove" onClick={() => handleDeleteDoc(f.id)} />
                            </div>
                        )
                    })}

                    <Header as="h5">Thumbnail</Header>
                    {/* <input type="file" name="thumbnail" onChange={handleChange} /> */}
                    <p>{getThumname()}</p>
                    <br />
                    <br />
                    <Button onClick={handleSubmit} style={{ backgroundColor: '#3498db', marginTop: '10px' }}>Update</Button>
                    {/* <Button onClick={handleDeleteProduct} style={{ backgroundColor: '#e74c3c', marginTop: '10px' }}>Delete</Button> */}
                    {/* <Button onClick={tests} style={{ backgroundColor: '#e74c3c', marginTop: '10px' }}>Test</Button> */}
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
}



export default ProductUpdate;


