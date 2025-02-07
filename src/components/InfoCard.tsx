type InfoProps = {
  type: string;
  value: number;
};

const InfoCard = ({ type, value }: InfoProps) => {
  return (
    <div className="w-[25%] h-[120px] flex flex-col items-center justify-center gap-2 border border-gray-300 bg-white p-4 m-2 rounded-lg shadow-md hover:shadow-lg transition duration-300">
      <h4 className="text-gray-600 text-sm font-medium uppercase">{type}</h4>
      <h5 className="text-2xl font-bold primary-clr">{value}</h5>
    </div>
  );
};

export default InfoCard;
