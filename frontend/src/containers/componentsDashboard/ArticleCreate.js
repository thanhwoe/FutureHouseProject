import React, { Component, useState, useEffect } from 'react';
import { useHistory, useParams, Link, withRouter, Redirect } from 'react-router-dom';
import axios from 'axios'
import { Header, Button, Card, Container, Icon, Image, Segment, Loader, Dimmer, Message, Grid, Input, TextArea, Form, Table, Label, Divider } from 'semantic-ui-react'
import { postCreateURL, userIDURL } from '../../constants'
import { authAxios } from "../../utils"
import ReactTimeAgo from 'react-time-ago'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NotificationContainer, NotificationManager } from 'react-notifications';

// import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';

const ArticleCreate = () => {
    const initialFormData = Object.freeze({
        title: '',
        overview: '',
        slug: '',
    });
    const [contentEditor, setContentEditor] = useState("");
    const [userId, setUserId] = useState(null);
    const [thumbnail, setThumbnail] = useState(null);
    const [formData, updateFormData] = useState(initialFormData);

    useEffect(() => {
        authAxios
            .get(userIDURL)
            .then(res => {
                setUserId(res.data.userID)
            })

    }, [])
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
    // const token = localStorage.getItem("token");
    // const token=Cookies.get("csrftoken")
    
    const handleChange = (e) => {
        if ([e.target.name] == 'title') {
            updateFormData({
                ...formData,
                // Trimming any whitespace
                [e.target.name]: e.target.value.trim(),
                ['slug']: slugify(e.target.value.trim()),
            });
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
    const handleSubmit = (e) => {
        e.preventDefault();
        let DataForm = new FormData();
        DataForm.append('title', formData.title)
        DataForm.append('overview', formData.overview)
        DataForm.append('slug', formData.slug)
        DataForm.append('content', contentEditor)
        DataForm.append('author', userId)
        DataForm.append('thumbnail', thumbnail.thumbnail[0])
        authAxios
            .post(postCreateURL, DataForm)
            .then((res) => {
                NotificationManager.success('Success message', 'Create Success');
            })
            .catch(err => {
                console.log(err)
            });
    };
    return (
        <Container>
            <Form>
                <Input name='title' placeholder='Title' onChange={handleChange} style={{marginBottom:'10px'}} />
                <TextArea placeholder='Overview' name="overview" onChange={handleChange} style={{marginBottom:'10px'}} />
                <Input placeholder='Slug' name="slug" fluid value={formData.slug} onChange={handleChange} style={{marginBottom:'10px'}} />
                <CKEditor
                    editor={ClassicEditor}
                    data={contentEditor}
                    onReady={editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log('Editor is ready to use!', editor);
                    }}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        setContentEditor(data)
                        console.log(data)
                    }}
                    onBlur={(event, editor) => {
                        console.log('Blur.', editor);
                    }}
                    onFocus={(event, editor) => {
                        console.log('Focus.', editor);
                    }}
                // config={{
                //     ckfinder: {
                //       // Upload the images to the server using the CKFinder QuickUpload command.
                //       uploadUrl: "http://127.0.0.1:8000/ckeditor/upload/",
                //       options: {
                //         resourceType: "Images",
                //       },
                //         credentials: 'include',

                //     //   headers: {
                //     //     'X-CSRF-TOKEN': token,
                //     // }
                //     },
                // }}
                />
                <Header as="h5">Thumbnail</Header>
                <input type="file" name="thumbnail" onChange={handleChange} />
                <Button onClick={handleSubmit}  style={{backgroundColor:'#3498db', marginTop:'10px'}}>Create</Button>
            </Form>

        </Container>
    );
}

export default ArticleCreate;
