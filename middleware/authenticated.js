export default function ({ redirect }) {
  const session = !!sessionStorage.getItem("userToken");

  if (!session) {
    return redirect("/");
  }
}
