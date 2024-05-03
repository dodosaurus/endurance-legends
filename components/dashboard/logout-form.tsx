import LoaderButton from "./loader-button";

type LogoutFormProps = {
  logout: () => void;
};

function LogoutForm({ logout }: LogoutFormProps) {
  return (
    <form action={logout}>
      <LoaderButton text="Logout" />
    </form>
  );
}

export default LogoutForm;
