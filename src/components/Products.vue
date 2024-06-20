<template>
    <div class="row">
        <div class="col-md-6">
            <h3 class="text-center mb-4">Add Products</h3>
            <div v-if="message_create_product" class="text-danger my-3"> 
                {{ message_create_product }} 
            </div>
            <form @submit.prevent="createProduct">
                <div class="form-group">
                    <label for="code">Code:</label>
                    <input class="form-control" type="text" id="code" v-model="postData.code">
                </div>
                <div class="form-group">
                    <label for="name">Name: </label>
                    <input class="form-control" type="text" id="name" v-model="postData.name">
                </div>
                <div class="form-group">
                    <label for="qty">Qty: </label>
                    <input class="form-control" type="number" id="qty" v-model="postData.qty">
                </div>
                <div class="form-group">
                    <label for="description">Description: </label>
                    <textarea class="form-control"  id="description" rows="6" cols="22" v-model="postData.description"></textarea>
                </div>
                <div class="form-check mt-2">
                    <input class="form-check-input" type="checkbox" id="status" v-model="postData.status">
                    <label for="status" class="form-check-label">Status (Check For Activate) </label>
                </div>
                <button class="btn btn-primary mt-4 w-100">Create Product</button>
            </form>
        </div>
        <div class="col-md-6">
            <h3 class="text-center mb-4">Add History Product</h3>
            <div v-if="message_create_note" class="my-3"> 
                {{ message_create_note }} 
            </div>
            <form @submit.prevent="createNote" class="d-flex flex-column">
                <div class="form-group">
                    <label for="code">Product Code</label>
                    <select id="code" class="form-control" v-model="postNote.code">
                        <option v-for="(product, index) in products" :key="index" :value="product.Code">{{ product.Code }} - {{ product.Nama }}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="code">Note</label>
                    <select id="code" class="form-control" v-model="postNote.note">
                        <option value="Masuk">Masuk</option>
                        <option value="Keluar">Keluar</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="qty">Qty: </label>
                    <input class="form-control" type="number" id="qty" v-model="postNote.qty">
                </div>
                <button class="btn btn-primary mt-4">Create Note</button>
            </form>
        </div>
    </div>
    
    <div class="card mt-4">
        <div class="card-body">
            <h4>List of Products</h4>
            <div class="table-responsive">
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">No.</th>
                        <th scope="col">Code</th>
                        <th scope="col">Name</th>
                        <th scope="col">Qty</th>
                        <th scope="col" style="width:15%">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(product, index) in products" :key="index">
                        <th>{{ index + 1 }}</th>
                        <td>{{ product.Code }}</td>
                        <td>{{ product.Nama }}</td>
                        <td>{{ product.Jumlah }}</td>
                        <td class="d-flex justify-content-between">
                            <router-link :to="{name: 'product-detail', params:{code: product.Code}}" class="btn btn-outline-secondary">Detail</router-link>
                            <button class="btn btn-danger" v-on:click="deleteProduct(product.Code)">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            </div>
        </div>
    </div>

</template>
    <script>
    import axios from 'axios';

    export default {
        name: "Product",
        data(){
            return{
                products: null,
                message: null,
                message_create_product: null,
                message_create_note: null,
                postData: {
                    code: '',
                    name: '',
                    qty: 0,
                    description: '',
                    status: false
                },
                postNote: {
                    code: '',
                    note: '',
                    qty: 0
                }
            }
        },
        methods: {
            createProduct(){
                let formData = new FormData()
                formData.append('code', this.postData.code)
                formData.append('name', this.postData.name)
                formData.append('qty', this.postData.qty)
                formData.append('description', this.postData.description)
                formData.append('status', this.postData.status)
                axios
                    .post(import.meta.env.VITE_BASE_URL + '/products', formData)
                    .then((response) => {
                        if(response.data.status == 'failed'){
                            this.message_create_product = response.data.message
                        }else{
                            this.message_create_product = null
                        }
                        this.getProducts()
                    })
            },
            getProducts(){
                axios
                .get(import.meta.env.VITE_BASE_URL + '/products')
                .then(response => (this.products = response.data.products))
            },
            createNote(){
                let postNoteData = new FormData()
                postNoteData.append('code', this.postNote.code)
                postNoteData.append('note', this.postNote.note)
                postNoteData.append('qty', this.postNote.qty)
                axios
                    .post(import.meta.env.VITE_BASE_URL + '/post/note', postNoteData)
                    .then((response) => {
                        this.message_create_note = response.data.message
                        console.log(response.data.message)
                        this.getProducts()
                    })
            },
            deleteProduct(code){
                axios
                .delete(import.meta.env.VITE_BASE_URL + `/products/` + code)
                .then((response) => {
                    if(response.data.status == 'failed'){
                            this.message = response.data.message
                        }else{
                            this.message = null
                        }
                    this.getProducts()
                })
            }
        },
        mounted () {
            this.getProducts()
        }
};
</script>