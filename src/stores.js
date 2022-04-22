import { writable } from "svelte/store";

export const FeedbackStore = writable([]);

export default async function getData(data = {}) {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/get_feedback", {
      method: "GET",
    });
    let result = await response.json();
    let status = result.ok;
    if (status) {
      FeedbackStore.update(() => {
        return result.data;
      });
    }
  } catch (error) {
    console.log(error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  getData();
});
