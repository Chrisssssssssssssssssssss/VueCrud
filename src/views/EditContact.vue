<template>
    <div class="container mt-3">
        <div class="row">
            <div class="col">
                <p class="h3 text-success fw-bold">Edit Contact</p>
                <p class="fst-italic">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ultricies imperdiet urna nec lobortis. Nam tempus enim enim, a posuere libero finibus auctor. Cras facilisis luctus mi ac viverra. Vivamus tempor lobortis gravida. Suspendisse potenti. Cras dictum elit tortor, vitae blandit lorem blandit et. Etiam ut nisi eu velit mattis auctor non ut libero. In hac habitasse platea dictumst.</p>
            </div>
        </div>
    </div>
    <div class="container mt-3">
        <div class="row">
            <div class="col-md-4">
                <form action="" @submit.prevent="updateSubmit()">
                    <div class="mb-2">
                        <input v-model="contact.name" type="text" class="form-control" placeholder="Name">
                    </div>
                    <div class="mb-2">
                        <input v-model="contact.photo" type="text" class="form-control" placeholder="Photo URL">
                    </div>
                    <div class="mb-2">
                        <input v-model="contact.email" type="email" class="form-control" placeholder="Email">
                    </div>
                    <div class="mb-2">
                        <input v-model="contact.mobile" type="number" class="form-control" placeholder="Mobile">
                    </div>
                    <div class="mb-2">
                        <input v-model="contact.company" type="text" class="form-control" placeholder="Company">
                    </div>
                    <div class="mb-2">
                        <input v-model="contact.title" type="text" class="form-control" placeholder="Title">
                    </div>
                    <div class="mb-2">
                        <select v-model="contact.groupId" v-if="groups.length > 0" name="" class="form-control">
                            <option value="">Select Group</option>
                            <option v-for="group of groups" :value="group.id" :key="group.id">{{group.name}}</option>
                        </select>
                    </div>
                    <div class="mb-2">
                        <input type="submit" class="btn btn-success" value="Update">
                    </div>
                </form>
            </div>
            <div class="col-md-4">
                <img :src="contact.photo" alt="" class="contact-img">
            </div>
    </div>
</div></template>

<script>
import { ContactService } from '@/services/ContactService'
    export default {
        name: "EditContact",
        data(){
            return{
                contactId: this.$route.params.contactId,
                loading: false,
                contact: {
                    name: "",
                    company: "",
                    email: "",
                    title: "",
                    mobile: "",
                    photo: "",
                    groupId: ""
                },
                errorMessage: null,
                groups: []
            }
        },
        async created(){
            try{
                this.loading = true;
                let response = await ContactService.getContact(this.contactId);
                let groupResponse = await ContactService.getAllGroups();
                this.contact = response.data;
                this.groups = groupResponse.data;
                this.loading = false;
            }catch(error){
                this.errorMessage = error;
                this.loading = false;
            }
        },
        methods:{
            async updateSubmit() {
            try {
                let response = await ContactService.updateContact(this.contact, this.contactId);
                if (response) {
                    return this.$router.push('/');
                } else {
                    return this.$router.push(`/contacts/edit/${this.contactId}`);
                }
            } catch (error) {
                console.log(error);
            }
        }
        }
    }
</script>

<style lang="scss" scoped>

</style>