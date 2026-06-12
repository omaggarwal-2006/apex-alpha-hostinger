import { Router } from 'express';
import { MarketDataService } from '../services/market.service';
import { GeminiService } from '../services/gemini.service';
import YahooFinance from 'yahoo-finance2';
const yahooFinance = new YahooFinance();

const router = Router();

router.get('/search', async (req, res) => {
  try {
    const query = req.query.q as string;
    if (!query) return res.json([]);
    try {
      const results: any = await yahooFinance.search(query);
      return res.json(results.quotes.map((q: any) => ({
        symbol: q.symbol,
        name: q.shortname,
        exchange: q.exchange
      })));
    } catch (e) {
      const results = await MarketDataService.searchAssets(query);
      res.json(results);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/snapshot', async (req, res) => {
  try {
    const symbol = req.query.symbol as string;
    
    if (!symbol) {
      console.warn("[MarketRoutes] Missing symbol in request");
      return res.status(400).json({ error: 'Symbol is required' });
    }

    const data = await MarketDataService.getMarketSnapshot(symbol);
    
    if (!data) {
      console.error(`[MarketRoutes] Data failed for: ${symbol}`);
      return res.status(404).json({ error: `Market data failed for ${symbol}` });
    }

    res.json(data);
  } catch (error: any) {
    console.error(`[MarketRoutes] Error:`, error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/news', async (req, res) => {
  try {
    const stories = await GeminiService.generateNews();
    res.json(stories);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/headlines', async (req, res) => {
  try {
    const headlines = await GeminiService.generateHeadlines();
    res.json(headlines);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/analysis', async (req, res) => {
  try {
    const symbol = req.query.symbol as string || 'BTC-USD';
    const prices = await MarketDataService.getBatchPrices([symbol]);
    const currentPrice = prices[symbol] || 100.00;
    const analysis = await GeminiService.generateAssetAnalysis(symbol, currentPrice);
    res.json(analysis);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
