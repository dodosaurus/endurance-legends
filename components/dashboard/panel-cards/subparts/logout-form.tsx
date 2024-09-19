import LoaderButton from "./loader-button";

type LogoutFormProps = {
  logout: () => void;
};

function LogoutForm({ logout }: LogoutFormProps) {
  return (
    <form action={logout}>
      <LoaderButton text="Logout" variant="outline" />
    </form>
  );
}

export default LogoutForm;
