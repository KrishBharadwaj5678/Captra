const DelayTimer = ({ timer }) => {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <p
        key={timer}
        className="text-8xl font-semibold animate-pop  text-[#3E9DFF] countdown"
      >
        {timer}
      </p>
    </div>
  );
};

export default DelayTimer;
