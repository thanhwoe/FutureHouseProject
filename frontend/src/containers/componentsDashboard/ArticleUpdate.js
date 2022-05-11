import React, { Component, useState, useEffect } from 'react';
import { useHistory, useParams, Link, withRouter, Redirect } from 'react-router-dom';
import axios from 'axios'
import { Header, Button, Card, Container, Icon, Image, Segment, Loader, Dimmer, Message, Grid, Input, TextArea, Form, Table, Label, Divider } from 'semantic-ui-react'
import { postBlogURL, postDeleteURL,postDetailBlogURL,postUpdateURL } from '../../constants'
import { authAxios } from "../../utils"
import ReactTimeAgo from 'react-time-ago'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NotificationContainer, NotificationManager } from 'react-notifications';

const ArticleUpdate = (props) => {
    const initialFormData = Object.freeze({
        title: '',
        overview: '',
        slug: '',
    });
    const [contentEditor, setContentEditor] = useState("");
    const [thumbnail, setThumbnail] = useState(null);
    const [formData, updateFormData] = useState(initialFormData);
    useEffect(() => {
        handleFetchItem()
    }, [updateFormData]);
    const handleFetchItem = () => {
        authAxios
            .get(postDetailBlogURL(props.id))
            .then((res) => {
                updateFormData({
                    ...formData,
                    ['title']: res.data.title,
                    ['slug']: res.data.slug,
                    ['overview']: res.data.overview,
                });
                setThumbnail(res.data.thumbnail)
                setContentEditor(res.data.content)
            });
    }
    const handleChange = (e) => {
        updateFormData({
            ...formData,
            // Trimming any whitespace
            [e.target.name]: e.target.value.trim(),
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        authAxios
            .put(postUpdateURL(props.id), {
                title: formData.title,
                content: contentEditor,
                slug: formData.slug,
                overview: formData.overview
            })
            .then(res=>{
                NotificationManager.success('Success message', 'Update Success');
            })
    };
    const getThumname = () => {
        if (thumbnail) {
            var Thumbname = thumbnail.replace(/^.*[\\\/]/, '')
            return Thumbname
        } else {
            return "None"
        }
    }
    return (
        <Container>
            <Form>
                <p>Title</p>
                <Input name='title' placeholder='Title' onChange={handleChange} value={formData.title}/>
                <p>Overview</p>
                <TextArea placeholder='Overview' name="overview" onChange={handleChange} value={formData.overview} />
                <p>Slug</p>
                <Input placeholder='Slug' name="slug" fluid value={formData.slug} onChange={handleChange} />
                <br/>
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
                {/* <input type="file" name="thumbnail" onChange={handleChange} /> */}
                <p>{getThumname()}</p>
                <Button onClick={handleSubmit} style={{backgroundColor:'#3498db', marginTop:'10px'}}>Update</Button>
            </Form>

        </Container>
    );
}

export default ArticleUpdate;
