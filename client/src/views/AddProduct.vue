<script>
import { mapActions, mapWritableState } from 'pinia';
import { useRZStore } from '../stores/RZ';
export default {
    name: "AddProduct",
    computed: {
      ...mapWritableState(useRZStore, ['product'])
    },
    methods: {
      ...mapActions(useRZStore, ['addProduct']),
      onFileChange(e) {
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length) {
          return;
        }
        console.log(e.target.files)
          
        this.product.img = e.target.files[0]
      },
    }
}
</script>
<template>
<div class="container mt-16 max-w-sm bg-white m-auto p-10 rounded-md shadow-lg">
         <h1 class="text-3xl font-thin text-center">Form Add Product</h1>
         <form action="" class="mt-5" @submit.prevent="addProduct" enctype="multipart/form-data">
           <label for="" class="block">
             <span class="block font-semibold text-sm text-slate">Product Name</span>
             <input
               type="text" v-model="product.name"
               class="block w-full mt-1 border border-gray-400 rounded-md"
               placeholder="Enter product name ..."
             />
           </label>
           <label for="" class="block">
             <span class="block font-semibold text-sm text-slate">Product Picture</span>
             <input
              @change="onFileChange"
              type="file" 
              class="block w-full mt-1 border border-gray-400 rounded-md"
              placeholder="Enter product picture ..."
             />
           </label>
           <label for="" class="block">
             <span class="block font-semibold text-sm text-slate">Description</span>
             <input
               type="text" v-model="product.description"
               class="block w-full mt-1 border border-gray-400 rounded-md"
               placeholder="Enter product description ..."
             />
           </label>
           <label for="" class="block">
             <span class="block font-semibold text-sm text-slate">Price</span>
             <input
               type="text" v-model="product.price "
               class="block w-full mt-1 border border-gray-400 rounded-md"
               placeholder="Enter product price ..."
             />
           </label>
           <button
             type="submit"
             class="mt-4 text-sm bg-gray-500 border border-1 px-2 py-1 rounded-md text-white"
           >
             Cancel
           </button>
           <button
             type="submit"
             class="mt-4 text-sm bg-sky-400 border border-1 px-2 py-1 rounded-md text-white"
           >
             Submit
           </button>
         </form>
       </div>    
</template>