<template>
    <div class="container mt-3">
        <div class="row">
            <div class="col">
                <p class="h3 text-success fw-bold">Add Contact</p>
                <p class="fst-italic">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ultricies imperdiet urna nec lobortis. Nam tempus enim enim, a posuere libero finibus auctor. Cras facilisis luctus mi ac viverra. Vivamus tempor lobortis gravida. Suspendisse potenti. Cras dictum elit tortor, vitae blandit lorem blandit et. Etiam ut nisi eu velit mattis auctor non ut libero. In hac habitasse platea dictumst.</p>
            </div>
        </div>
    </div>
    <div class="container mt-3">
        <div class="row">
            <div class="col-md-4">
                <form action="" @submit.prevent="submitCreate()">
                    <div class="mb-2">
                        <input v-model="contact.name" type="text" class="form-control" placeholder="Name" required>
                    </div>
                    <div class="mb-2">
                        <input v-model="contact.photo" type="text" class="form-control" placeholder="Photo URL" required>
                    </div>
                    <div class="mb-2">
                        <input v-model="contact.email" type="email" class="form-control" placeholder="Email" required>
                    </div>
                    <div class="mb-2">
                        <input v-model="contact.mobile" type="number" class="form-control" placeholder="Mobile" required>
                    </div>
                    <div class="mb-2">
                        <input v-model="contact.company" type="text" class="form-control" placeholder="Company" required>
                    </div>
                    <div class="mb-2">
                        <input v-model="contact.title" type="text" class="form-control" placeholder="Title" required>
                    </div>
                    <div class="mb-2">
                        <select v-model="contact.groupId" name="" class="form-control" v-if="groups.length > 0" required>
                            <option value="">Select Group</option>
                            <option :value="group.id" v-for="group of groups" :key="group.id">{{group.name}}</option>
                        </select>
                    </div>
                    <div class="mb-2">
                        <input type="submit" class="btn btn-success" value="Create">
                    </div>
                </form>
            </div>
            <div class="col-md-4">
                <img :src="contact.photo" alt="" class="contact-img">
            </div>
        </div>
    </div>
</template>

<script>
import { ContactService } from '@/services/ContactService'
    export default {
        name: "AddContact",
        data(){
            return {
                contact: {
                    name: "",
                    company: "",
                    email: "",
                    title: "",
                    mobile: "",
                    photo: "",
                    groupId: ""
                },
                groups: [],
            }
        },
        async created(){
            try{
                let response = await ContactService.getAllGroups();
                this.groups = response.data;
            }catch(error){
                console.log(error);
            }
        },
        methods:{
            async submitCreate(){
                try{
                    let response = await ContactService.createContact(this.contact);
                    if(response){
                        return this.$router.push('/');
                    }else{
                        return this.$router.push('/contacts/add');
                    }
                }catch(error){
                    console.log(error);
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>