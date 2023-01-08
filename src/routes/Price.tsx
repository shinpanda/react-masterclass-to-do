import styled from "styled-components";

interface PriceProps {
  quotes?: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

const Title = styled.div`
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.5);
  padding: 10px;
  font-size: 20px;
  font-weight: 400;
  text-align: center;
  color: ${(props) => props.theme.accentColor};
  margin: 10px 0px;
`;

const PriceHistory = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: stretch;
  justify-items: center;
  margin-top: 10px;
  gap: 5px;
`;

const PriceHistoryItem = styled.div`
  display: flex;
  background: rgba(0, 0, 0, 0.5);
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    margin-bottom: 5px;
  }
  width: 100%;
  padding: 10px;
  border-radius: 4px;
`;

function getPastPrice(currentPrice: number, gap: number): string {
  return (
    (gap < 0 ? 100 / (100 + gap) : (100 - gap) / 100) * currentPrice
  ).toFixed(2);
}

function Price({ quotes }: PriceProps) {
  return (
    <>
      <Title>가격 변동 사항</Title>
      {quotes ? (
        <>
          <PriceHistoryItem>
            <span>현재 (USD / BTC)</span>
            <span>{quotes?.USD.price.toFixed(2)}</span>
          </PriceHistoryItem>
          <PriceHistory>
            <PriceHistoryItem>
              <span>1시간 전</span>
              <span>{quotes?.USD.percent_change_1h} %</span>
              <span>
                {getPastPrice(quotes.USD.price, quotes.USD.percent_change_1h)}
              </span>
            </PriceHistoryItem>
            <PriceHistoryItem>
              <span>6시간 전</span>
              <span>{quotes.USD.percent_change_6h} %</span>
              <span>
                {getPastPrice(quotes.USD.price, quotes.USD.percent_change_6h)}
              </span>
            </PriceHistoryItem>
            <PriceHistoryItem>
              <span>12시간 전</span>
              <span>{quotes.USD.percent_change_12h} %</span>
              <span>
                {getPastPrice(quotes.USD.price, quotes.USD.percent_change_12h)}
              </span>
            </PriceHistoryItem>
            <PriceHistoryItem>
              <span>24시간 전</span>
              <span>{quotes.USD.percent_change_24h} %</span>
              <span>
                {getPastPrice(quotes.USD.price, quotes.USD.percent_change_24h)}
              </span>
            </PriceHistoryItem>
            <PriceHistoryItem>
              <span>30일 전</span>
              <span>{quotes.USD.percent_change_30d} %</span>
              <span>
                {getPastPrice(quotes.USD.price, quotes.USD.percent_change_30d)}
              </span>
            </PriceHistoryItem>
            <PriceHistoryItem>
              <span>1년 전</span>
              <span>{quotes.USD.percent_change_1y} %</span>
              <span>
                {getPastPrice(quotes.USD.price, quotes.USD.percent_change_1y)}
              </span>
            </PriceHistoryItem>
          </PriceHistory>
        </>
      ) : (
        "표시할 내용이 없습니다."
      )}
    </>
  );
}

export default Price;
