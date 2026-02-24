function ErrorMessage({ message }) {
  return (
    <div className="mt-4 text-red-600 font-semibold">
      {message}
    </div>
  );
}

export default ErrorMessage;