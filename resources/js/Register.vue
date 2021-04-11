<template>
  <div class="bg-white sm:bg-gray-100 h-full flex justify-center">
    <div class="container sm:w-400p mt-2 sm:mt-10 flex flex-col items-center">
      <div class="text-3xl text-blue-700 font-bold mb-10">
        <router-link :to="{name:'board'}">Laravello</router-link>
      </div>
      <div class="w-full sm:shadow-xl sm:bg-white sm:py-8 sm:px-12">
        <div class="w-full text-center text-gray-600 font-bold mb-8">
          Signup for your account
        </div>
        <form>
          <div class="w-full mb-4">
            <input
              type="text"
              placeholder="Enter email"
              class="rounded-sm px-4 py-2 outline-none focus:outline-none border-gray-400 bg-gray-100 border-solid border-2 w-full text-sm"
            />
          </div>
          <div class="w-full mb-4">
            <input
              type="text"
              placeholder="Enter full name"
              class="rounded-sm px-4 py-2 outline-none focus:outline-none border-gray-400 bg-gray-100 border-solid border-2 w-full text-sm"
            />
          </div>
          <div class="w-full mb-4">
            <input
              type="password"
              placeholder="Enter password"
              class="rounded-sm px-4 py-2 outline-none focus:outline-none border-gray-400 bg-gray-100 border-solid border-2 w-full text-sm"
            />
          </div>
          <div class="w-full mb-6">
            <button
              type="submit"
              class="rounded-md px-4 py-2 text-sm bg-green-500 font-bold outline-none focus:outline-none hover:opacity-75 w-full text-white disabled:opacity-25"
            >
              Signup
            </button>
          </div>
        </form>
        <div class="bg-gray-400 h-px w-full mb-6"></div>
        <div class="text-center text-sm">
          <router-link :to="{ name: 'login' }" class="text-blue-600 hover:underline">
            Already have an account? Log In
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 300px;
  max-width: 300px;
}
@media (min-width: 640px) {
  .container {
    width: 400px;
    max-width: 400px;
  }
}
</style>
