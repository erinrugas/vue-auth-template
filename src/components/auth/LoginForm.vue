<template>
    <AuthLayout>
        <template #background>
            <div class="object-cover w-full h-screen hidden md:block image"></div>
        </template>

        <template #auth-header>
            <p class="text-center text-3xl">Login to your account</p>
        </template>
        
        <template #auth-body>
            <form class="flex flex-col pt-3 md:pt-8" @submit.prevent="handleSubmit">
            
                <div class="flex flex-col pt-4">
                    <input type="email" id="email" v-model="inputRef.email"
                        placeholder="Email"
                        :class="validate.email[0] ? 'border-red-500 ' : ''"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                    >
                    <p class="text-red-700">
                        {{ validate.email[0] || "" }}
                    </p>
                </div>

                <div class="flex flex-col pt-4">
                    <input type="password" id="password" v-model="inputRef.password"
                        placeholder="Password"
                        :class="validate.password[0] ? 'border-red-500 ' : ''"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                    >
                    <p class="text-red-700">
                        {{ validate.password[0] || "" }}
                    </p>
                </div>

                <div class="flex items-center justify-between mt-5">
                    <div class="flex items-center">
                        <input id="remember-me" name="remember-me" type="checkbox"
                            class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600">
                        <label for="remember-me" class="ml-2 block text-sm text-gray-900">Remember me</label>
                    </div>

                    <div class="text-sm">
                        <RouterLink to="/forgot-password" class="font-medium text-blue-900 hover:text-blue-900">Forgot your password?</RouterLink>
                    </div>
                </div>

                <button type="submit" class="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8">Sign in</button>
            </form>
        </template>

        <template #auth-footer>
            <div class="text-center pt-12 pb-12">
                <p>No account? <RouterLink to="/register" class="underline font-semibold">Sign up</RouterLink></p>
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
    email: "",
    password: ""
})

const validate = ref({
    email: "",
    password: ""
})

const validateLogin = () => {
    let { isValid, message } = FormValidation({
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
            email: message?.email || "",
            password: message?.password || ""
        };

        return false;
    }

    validate.value = {
        email: '',
        password: ''
    }
    return isValid;
}

const handleSubmit = (e: Event) => {
    const isValid = validateLogin()

    if (isValid) {
        inputRef.value.email = ''
        inputRef.value.password = ''

        alert('Successfully Login');
    }
}
</script>