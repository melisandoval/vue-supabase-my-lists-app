<template>
  <section>
    <router-view />
  </section>
</template>

<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useUserStore } from "./piniaStores/userStore";

const router = useRouter();

// storing the Pinia store object to use its states and actions:
const userStore = useUserStore();
// getting the state user from the Pinia store:
const { user, session } = storeToRefs(userStore);

onMounted(async () => {
  try {
    // the Pinia store calls Supabase to get the logged-in user in order to show the user's dashboard in path "/":
    await userStore.fetchUser();

    if (!user.value) {
      // inicial pinia state "user" is null, but fetchUser() sets "user" value to the logged in user in Supabase, so:
      // if the current Pinia user state is null, means that the user is not logged in in Supabase,
      // so router redirects the user from path "/" to path "/login":
      router.push({ path: "/login" });
    }

    if (user.value) {
      // if the user is logged in in Supabase, continue to user's dashboard
      console.log(`session in Pinia store is ${JSON.stringify(session.value)}`);
      router.push({ path: "/" });
    }
  } catch (error) {
    console.log(error);
  }
});
</script>
