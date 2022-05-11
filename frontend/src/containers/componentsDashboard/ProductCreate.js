import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Header, Button, Card, Container, Icon, Image, Segment, Loader, Dimmer, Message, Grid, Input, TextArea, Form, Divider } from 'semantic-ui-react'
import { productCreateURL } from '../../constants'
import { authAxios } from "../../utils"
import { useHistory } from 'react-router-dom';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { UploaderComponent } from '@syncfusion/ej2-react-inputs';

const ProductCreate = () => {
    function slugify(string) {
        const a =
            'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;';
        const b =
            'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------';
        const p = new RegExp(a.split('').join('|'), 'g');

        return string
            .toString()
            .toLowerCase()
            .replace(/\s+/g, '-') // Replace spaces with -
            .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
            .replace(/&/g, '-and-') // Replace & with 'and'
            .replace(/[^\w\-]+/g, '') // Remove all non-word characters
            .replace(/\-\-+/g, '-') // Replace multiple - with single -
            .replace(/^-+/, '') // Trim - from start of text
            .replace(/-+$/, ''); // Trim - from end of text
    }
    const history = useHistory();
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
    const [mImage, setmImage] = useState();
    const [mDoc, setmDoc] = useState();
    const handleChange = (e) => {
        if ([e.target.name] == 'title') {
            updateFormData({
                ...formData,
                // Trimming any whitespace
                [e.target.name]: e.target.value.trim(),
                ['slug']: slugify(e.target.value.trim()),
            });
        } else if ([e.target.name] == 'files') {
            setmFile(e.target.files);

        }
        else if ([e.target.name] == 'images') {
            setmImage(e.target.files);

        }
        else if ([e.target.name] == 'document') {
            setmDoc(e.target.files);

        }
        else if ([e.target.name] == 'thumbnail') {
            setThumbnail({
                thumbnail: e.target.files,
            });

        }
        else {
            updateFormData({
                ...formData,
                // Trimming any whitespace
                [e.target.name]: e.target.value.trim(),
            });
        }
    };
    const tesst = () => {
        console.log(mImage)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(formData)
        let DataForm = new FormData();
        DataForm.append('title', formData.title)
        DataForm.append('price', formData.price)
        DataForm.append('discount_price', formData.discount_price)
        DataForm.append('category', formData.category)
        DataForm.append('label', formData.label)
        DataForm.append('slug', formData.slug)
        DataForm.append('description', formData.description)
        DataForm.append('square_foot', formData.square_foot)
        DataForm.append('beds', formData.beds)
        DataForm.append('stories', formData.stories)
        DataForm.append('garages', formData.garages)
        DataForm.append('baths', formData.baths)
        // DataForm.append('thumbnail', thumbnail.thumbnail[0])
        DataForm.append('thumbnail', thumbnail[0].rawFile)
        for (let index = 0; index < mFile.length; index++) {
            DataForm.append('files', mFile[index].rawFile)
        }
        for (let index = 0; index < mImage.length; index++) {
            DataForm.append('images', mImage[index].rawFile)
        }
        for (let index = 0; index < mDoc.length; index++) {
            DataForm.append('document', mDoc[index].rawFile)
        }
        // console.log(DataForm)
        authAxios
            .post(productCreateURL, DataForm)
            .then((res) => {
                // console.log(res)
                // history.push('/dashboard');
                NotificationManager.success('Success message', 'Create Success');

            })
            .catch(err => {
                console.log(err)
                NotificationManager.Error('Error message', 'Somthing Wrong');

            });
    };

    return (
        <Form>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={1}></Grid.Column>
                    <Grid.Column width={10} className="border-css">
                        <Header>General Infomation</Header>
                        <Input placeholder='Title' name="title" fluid onChange={handleChange} />
                        <br />
                        <Input placeholder='Slug' name="slug" fluid value={formData.slug} onChange={handleChange} />
                        <br />
                        <TextArea placeholder='Description' name="description" onChange={handleChange} />
                    </Grid.Column>
                    <Grid.Column width={1} ></Grid.Column>
                    <Grid.Column width={3} className="border-css" textAlign="center">
                        <Header>Organize Product</Header>
                        <Input list='categoryList' name="category" id="categoryInput" placeholder='Category' onChange={handleChange} />
                        <datalist id='categoryList'>
                            <option value="Bungalow"></option>
                            <option value="Classical"></option>
                            <option value="Modern"></option>
                            <option value="Traditional"></option>
                            <option value="Luxury"></option>
                        </datalist>
                        <Divider hidden />
                        <Input list='labelList' name="label" id="labelInput" placeholder='Label' onChange={handleChange} />
                        <datalist id='labelList'>
                            <option value="New"></option>
                            <option value="Trending"></option>
                        </datalist>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={1}></Grid.Column>
                    <Grid.Column width={10} className="border-css">
                        <Header>Stats</Header>
                        <Input name='square_foot' placeholder='Square meter' onChange={handleChange} />
                        
                        <Input name='beds' placeholder='Beds' onChange={handleChange} list='beds' />
                        <datalist id='beds'>
                            <option value="1"></option>
                            <option value="2"></option>
                            <option value="3"></option>
                            <option value="4"></option>
                            <option value="5"></option>
                        </datalist>
                        <Input name='garages' placeholder='Garages' onChange={handleChange} list='garages'/>
                        <datalist id='garages'>
                            <option value="1"></option>
                            <option value="2"></option>
                            <option value="3"></option>
                            <option value="4"></option>
                            <option value="5"></option>
                        </datalist>
                        <Input name='stories' placeholder='Stories' onChange={handleChange} list='stories'/>
                        <datalist id='stories'>
                            <option value="1"></option>
                            <option value="2"></option>
                            <option value="3"></option>
                            <option value="4"></option>
                            <option value="5"></option>
                        </datalist>
                        <Input name='baths' placeholder='Baths' onChange={handleChange} list='baths'/>
                        <datalist id='baths'>
                            <option value="1"></option>
                            <option value="2"></option>
                            <option value="3"></option>
                            <option value="4"></option>
                            <option value="5"></option>
                        </datalist>
                    </Grid.Column>
                    <Grid.Column width={1}></Grid.Column>

                    <Grid.Column width={3} className="border-css" textAlign="center">
                        <Header>Price</Header>
                        <Input iconPosition='left' placeholder='Initial price' name='price' onChange={handleChange}>
                            <Icon name='dollar sign' />
                            <input />
                        </Input>
                        <Input iconPosition='left' name='discount_price' placeholder='Retail price' onChange={handleChange}>
                            <Icon name='dollar sign' />
                            <input />
                        </Input>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={1}></Grid.Column>

                    <Grid.Column className="border-css" width={10}>
                        <Header>Upload</Header>
                        <Header as="h5">File</Header>
                        <UploaderComponent
                            selected={f => setmFile(f.filesData)}
                            allowedExtensions='.dae, .mtl, .obj, .fbx'
                            maxFileSize={10000000} //10MB
                        />

                        <Header as="h5">Image</Header>
                        <UploaderComponent
                            selected={f => setmImage(f.filesData)}
                            allowedExtensions='.jpg, .png'
                            maxFileSize={10000000}
                        />

                        <Header as="h5">Document</Header>
                        <UploaderComponent
                            selected={f => setmDoc(f.filesData)}
                            allowedExtensions='.zip'
                            maxFileSize={15000000} />

                        <Header as="h5">Thumbnail</Header>
                        <UploaderComponent
                            selected={f => setThumbnail(f.filesData)}
                            allowedExtensions='.jpg, .png'
                            multiple={false}
                            maxFileSize={10000000}
                        />


                        <Button onClick={handleSubmit} style={{ backgroundColor: '#3498db', marginTop: '20px' }}>Create</Button>
                        {/* <Button onClick={tesst}>tesst</Button> */}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Form>

    );
}

export default ProductCreate;
