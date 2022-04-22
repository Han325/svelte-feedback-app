<script>
  import { FeedbackStore } from "../stores";
  import { v4 as uuidV4 } from "uuid";
  import Card from "./Card.svelte";
  import Button from "./Button.svelte";
  import RatingSelect from "./RatingSelect.svelte";
  import getData from "../stores"

  let text = "";
  let btnDisabled = false;
  let min = 10;
  let message;
  let rating = 10;

  const handleInput = () => {
    if (text.trim().length <= min) {
      message = `Text must be at least ${min} characters`;
      btnDisabled = true;
    } else {
      message = null;
      btnDisabled = false;
    }
  };

  const handleSelect = (e) => (rating = e.detail);

  const handleSubmit = () => {
    if (text.trim().length > min) {
      // const newFeedback = {
      //   id: uuidV4(),
      //   text,
      //   rating: +rating,
      // };

      // FeedbackStore.update((currentFeedback) => {
      //   return [newFeedback, ...currentFeedback];
      // });
      
      let form = new URLSearchParams()

      form.append("rating", rating)
      form.append("text", text)
      postFeedback(form)
      text = "";
    }
  };

  async function postFeedback(data={}){
    try {
      const response = await fetch("http://127.0.0.1:8000/api/post_feedback", {
        method:"POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: data,
      });
      let result = await response.json()
      let status = result.ok
      if (status){
        getData()
      }
    } catch (error){
      console.log(error)
    }
  }
</script>

<Card>
  <header>
    <h2>How would you rate your service with us?</h2>
  </header>
  <form on:submit|preventDefault={handleSubmit}>
    <RatingSelect on:rating-select={handleSelect} />
    <div class="input-group">
      <input
        type="text"
        bind:value={text}
        on:input={handleInput}
        placeholder="Tell us something that keeps you coming back."
      />
      <Button type="submit" disabled={btnDisabled}>Send</Button>
    </div>
    {#if message}
      <div class="message">
        {message}
      </div>
    {/if}
  </form>
</Card>

<style>
  header {
    max-width: 400px;
    margin: auto;
  }
  header h2 {
    font-size: 22px;
    font-weight: 600;
    text-align: center;
  }
  .input-group {
    display: flex;
    flex-direction: row;
    border: 1px solid #ccc;
    padding: 8px 10px;
    border-radius: 8px;
    margin-top: 15px;
  }
  input {
    flex-grow: 2;
    border: none;
    font-size: 16px;
  }
  input:focus {
    outline: none;
  }
  .message {
    padding-top: 10px;
    text-align: center;
    color: rebeccapurple;
  }
</style>
