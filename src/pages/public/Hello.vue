<template>
  <div>
    <Alert :color="'danger'" :heading="'Danger!'">
      <p class="margin-0">Red often indicates a dangerous or negative situation.</p>
    </Alert>

    <Alert :color="'warning'" :heading="'Warning!'">
      <p class="margin-0">Yellow often indicates a warning that might need attention.</p>
    </Alert>


    <header>
      <div class="wrapper">
        <HelloWorld msg="You did it!"/>
      </div>
      <div class="wrapper">
        <HelloWorld msg="You did it!"/>
      </div>
      <div class="wrapper">
        <HelloWorld msg="You did it!"/>
      </div>
    </header>

    <main>
      <TheWelcome/>
    </main>
  </div>
</template>


<script>
import Alert from "../../components/clean/Alert.vue";
import HelloWorld from './../../components/HelloWorld.vue'
import TheWelcome from './../../components/TheWelcome.vue'

export default {
  name: "Hello",
  components: {
    Alert,
    HelloWorld,
    TheWelcome,
  },
}
</script>


<style scoped lang="sass">

</style>
