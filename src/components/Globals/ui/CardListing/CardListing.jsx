import CardList from "./CardList";

const CardListing = ({ tableRows }) => {
  console.log(tableRows);
  return (
    <div className="space-y-6">
      {tableRows.map((row, index) => {
        return (
          <CardList index={index} key={row?.visitId} {...row} data={row} />
        );
      })}
    </div>
  );
};

export default CardListing;
