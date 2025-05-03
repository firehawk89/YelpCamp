import Alert from '@repo/ui/alert';

interface ErrorAlertListProps {
  errors: string[] | null;
}

const ErrorAlertList = ({ errors }: ErrorAlertListProps) => (
  <>
    {errors?.length &&
      errors.map((error) => (
        <Alert color="danger" className="w-full" key={error}>
          {error}
        </Alert>
      ))}
  </>
);

export default ErrorAlertList;
