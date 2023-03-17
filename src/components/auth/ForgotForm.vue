<template>
    <AuthLayout>
        <template #background>
            <div class="object-cover w-full h-screen hidden md:block image"></div>
        </template>

        <template #auth-header>
            <p class="text-center text-3xl">Forgot Password</p>
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

                <button type="submit" class="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8">Forgot Password</button>
            </form>
        </template>

        <template #auth-footer>
             <div class="text-center pt-12 pb-12">
                <RouterLink to="/register" class="underline font-semibold">Back to Login</RouterLink>
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
})

const validate = ref({
    email: "",
})

const validateLogin = () => {
    let { isValid, message } = FormValidation({
        email: {
            value: inputRef.value.email,
            isRequired: true,
            isEmail: true
        }
    });

    if (!isValid) {

        validate.value = {
            email: message?.email || "",
        };

        return false;
    }

    validate.value = {
        email: '',
    }
    return isValid;
}

const handleSubmit = (e: Event) => {
    const isValid = validateLogin()

    if (isValid) {
        alert('Reset password link is sent to ' + inputRef.value.email);
        inputRef.value.email = '';
    }
}
</script>