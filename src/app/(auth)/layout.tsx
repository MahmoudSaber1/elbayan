const AuthLayout = ({ children }: PropsChildren) => {
	return (
		<main className="bg-neutral-100 min-h-screen">
			<div className="mx-auto max-w-screen-2xl p-4">
				<div className="flex flex-col items-center justify-center pt-4 md:pt-14">{children}</div>
			</div>
		</main>
	);
};

export default AuthLayout;
