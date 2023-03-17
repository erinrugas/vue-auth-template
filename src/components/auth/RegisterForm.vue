<template>
    <AuthLayout>
        <template #background>
            <div class="object-cover w-full h-screen hidden md:block image"></div>
        </template>

        <template #auth-header>
             <p class="text-center text-3xl">Create your account</p>
        </template>

        <template #auth-body>
            <form class="flex flex-col pt-3 md:pt-8" @submit.prevent="handleSubmit">
                <div class="flex flex-col pt-4">
                    <input type="text" id="name" v-model="inputRef.name"
                        placeholder="Name"
                        :class="validate.name[0] ? 'border-red-500 ' : ''"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                    >
                    <p class="text-red-700">
                        {{ validate.name[0] || "" }}
                    </p>
                </div>

                <div class="flex flex-col pt-4">
                    <input type="email" id="email" v-model="inputRef.email"
                        placeholder="Email"
                        :class="validate.email[0] ? 'border-red-500 ' : ''"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline">
                    <p class="text-red-700">
                        {{ validate.email[0] || "" }}
                    </p>
                </div>

                <div class="flex flex-col pt-4">
                    <input type="password" id="password" v-model="inputRef.password"
                        placeholder="Password"
                        :class="validate.password[0] ? 'border-red-500 ' : ''"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline">
                    <p class="text-red-700">
                        {{ validate.password[0] || "" }}
                    </p>
                </div>

                <button type="submit" class="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8">Sign
                    up</button>
            </form>
        </template>

        <template #auth-footer>
            <div class="text-center pt-12 pb-12">
                <p>Have an account? <RouterLink to="/" class="underline font-semibold">Sign in</RouterLink>
                </p>
            </div>
        </template>
    </AuthLayout>
</template>

<script setup lang="ts">
import AuthLayout from './AuthLayout.vue';
import FormValidation from '@/lib/forms/FormValidation'
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const inputRef = ref({
    name: "",
    email: "",
    password: ""
})

const validate = ref({
    name: "",
    email: "",
    password: ""
})

const validateLogin = () => {
    let { isValid, message } = FormValidation({
        name: {
            value: inputRef.value.name,
            isRequired: true,
        },
        email: {
            value: inputRef.value.email,
            isRequired: true,
            isEmail: true
        },
        password: {
            value: inputRef.value.password,
            isRequired: true,
        },
    });

    if (!isValid) {

        validate.value = {
            name: message?.name || "",
            email: message?.email || "",
            password: message?.password || ""
        };

        return false;
    }

    validate.value = {
        name: '',
        email: '',
        password: ''
    }
    return isValid;
}

const handleSubmit = (e: Event) => {
    const isValid = validateLogin()

    if (isValid) {
        alert(`
            Successfully Register User\n
            Name: ${inputRef.value.name} \n
            Email: ${inputRef.value.email} \n
            Password: ${inputRef.value.password}
        `);
        inputRef.value.name = '';
        inputRef.value.email = '';
        inputRef.value.password = '';
    }
}
</script>