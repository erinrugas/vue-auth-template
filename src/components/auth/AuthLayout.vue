<template>

    <div class="w-full flex flex-wrap">

        <!-- Image Section -->
        <div class="w-1/2 shadow-2xl bg-gray-500">
            <slot name="background"></slot>
        </div>

        <!-- Login Section -->
        <div class="w-full md:w-1/2 flex flex-col">
            <div class="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
                <slot name="auth-header"></slot>
    
                <slot name="auth-body"></slot>
    
                <slot name="auth-footer"></slot>
            </div>
        </div>
    </div>
</template>