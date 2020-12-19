<template>
    <div class="container">
        <div class="row">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">You can return <a href="#/posts">back</a> or <button type="button" class="btn btn-primary" v-on:click="save">save</button> the post.</h5>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">{{title}}</h5>
                    <p class="card-text">


                        <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor> 



                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


class MyUploadAdapter {
    constructor( loader ) {
        // CKEditor 5's FileLoader instance.
        this.loader = loader;

        // URL where to send files.
        this.url = 'http://localhost:3000/upload';
    }

    // Starts the upload process.
    upload() {
        return new Promise( ( resolve, reject ) => {
            this._initRequest();
            this._initListeners( resolve, reject );
            this._sendRequest();
        } );
    }

    // Aborts the upload process.
    abort() {
        if ( this.xhr ) {
            this.xhr.abort();
        }
    }

    // Example implementation using XMLHttpRequest.
    _initRequest() {
        const xhr = this.xhr = new XMLHttpRequest();

        xhr.open( 'POST', this.url, true );
        xhr.responseType = 'json';
    }

    // Initializes XMLHttpRequest listeners.
    _initListeners( resolve, reject ) {
        const xhr = this.xhr;
        const loader = this.loader;
        const genericErrorText = 'Couldn\'t upload file:' + ` ${ loader.file.name }.`;

        xhr.addEventListener( 'error', () => reject( genericErrorText ) );
        xhr.addEventListener( 'abort', () => reject() );
        xhr.addEventListener( 'load', () => {
            const response = xhr.response;

            if ( !response || response.error ) {
                return reject( response && response.error ? response.error.message : genericErrorText );
            }

            // If the upload is successful, resolve the upload promise with an object containing
            // at least the "default" URL, pointing to the image on the server.
            resolve( {
                default: response.url
            } );
        } );

        if ( xhr.upload ) {
            xhr.upload.addEventListener( 'progress', evt => {
                if ( evt.lengthComputable ) {
                    loader.uploadTotal = evt.total;
                    loader.uploaded = evt.loaded;
                }
            } );
        }
    }

    // Prepares the data and sends the request.
    _sendRequest() {
        this.loader.file.then(file => {
            const data = new FormData();

            data.append( 'upload', file );

            this.xhr.send( data );
        })
/*
        const data = new FormData();

        data.append( 'upload', this.loader.file );

        this.xhr.send( data );
*/
    }
}




    function MyCustomUploadAdapterPlugin( editor ) {
        editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
            return new MyUploadAdapter( loader );
        };
    }

    export default {
        name: 'PagePostEditor',
        data() {
            return {
                title: String,
                article: String,
                editor: ClassicEditor,
                editorData: '',
                editorConfig: {
                    image: {
                        // You need to configure the image toolbar, too, so it uses the new style buttons.
                        toolbar: [ 'imageTextAlternative', '|', 'imageStyle:alignLeft', 'imageStyle:full', 'imageStyle:alignRight' ],
                        styles: [
                            // This option is equal to a situation where no style is applied.
                           'full',

                           // This represents an image aligned to the left.
                           'alignLeft',

                           // This represents an image aligned to the right.
                           'alignRight'
                        ]
                    },
                    extraPlugins: [MyCustomUploadAdapterPlugin],
                }
            }
        },
        mounted() {
           const app = this;
           const postId = this.$route.params.postId;
           axios.get(`http://localhost:3000/api/posts/${postId}`).then(response => {
               app.showPost(response.data);
           });
        },
        methods: {
            showPost(post) {
                this.title = post.title;
                this.article = post.article;
                this.editorData = post.article;
            },
            save: function() {
           const app = this;
                console.log('sdsd')
                const postId = this.$route.params.postId;
                axios({
                    method: 'PUT',
                    url: `http://localhost:3000/api/posts/${postId}`,
                    data: {
                        article: app.editorData
                    }
                }).then(response => {
                    console.log(response);
                });
            }
        },
        computed: {
            editorLink: function() {
                return this.$route.params.postId + '/editor';
            }
        }
    }
</script>
