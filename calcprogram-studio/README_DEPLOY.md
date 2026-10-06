# CalcProgram Studio — 部署與設定

這個網站是純 HTML / CSS / JavaScript，不需要 build，最適合直接放 GitHub Pages。

## 1. 先改你的資料

打開 `assets/config.js`：

```js
window.SITE_CONFIG = {
  brandName: "你的品牌名",
  tagline: "Custom Calculator Programs for Exam & Coursework",
  contactEmail: "你的Email",
  whatsappUrl: "https://wa.me/852XXXXXXXX",
  formEndpoint: "",
  currency: "HK$",
  pricing: {
    starter: "299 起",
    paper: "899 起",
    suite: "1,999 起"
  }
};
```

最少要修改：`brandName`、`contactEmail`。沒有 WhatsApp 可保持空字串。

## 2. 表單目前如何工作

- `formEndpoint` 留空：客人按送出後，網站會整理成一封完整 inquiry，嘗試複製到剪貼簿，並打開客人的 Email App 寄給 `contactEmail`。
- 這個模式完全不用後端，GitHub Pages 直接可用。
- 日後若接 Formspree / 你自己的 API，把 endpoint 放進 `formEndpoint`，前端會改用 JSON POST。
- 由於 GitHub Pages 是靜態網站，本版本不假裝支援伺服器檔案上傳。客人先貼 Google Drive / OneDrive / Dropbox 連結。

## 3. GitHub Pages 最簡單部署

1. 在 GitHub 新增 repository，例如 `calcprogram-studio`。
2. 把這個資料夾內的**所有檔案**上傳到 repository 根目錄。
3. Repository → **Settings** → **Pages**。
4. **Build and deployment** → Source 選 **Deploy from a branch**。
5. Branch 選 `main`，Folder 選 `/(root)`，按 Save。
6. 等 Pages deployment 完成後，網站網址一般會是：
   `https://你的GitHubUsername.github.io/calcprogram-studio/`

## 4. 想用根網址

如果你建立名為 `你的GitHubUsername.github.io` 的 repository，則 user site 可直接用：
`https://你的GitHubUsername.github.io/`

## 5. 自訂 Domain

1. 買 domain，例如 `calcprogram.hk` / `yourbrand.com`。
2. GitHub repo → Settings → Pages → Custom domain，輸入 domain。
3. 到 domain DNS 供應商按 GitHub Pages 文件設定 CNAME / apex DNS。
4. DNS 生效及 GitHub 驗證後啟用 HTTPS。

## 6. 上線前 checklist

- [ ] 改 `brandName`
- [ ] 改 `contactEmail`
- [ ] 如使用 WhatsApp，填 `whatsappUrl`
- [ ] 檢查三個價格是否適合你
- [ ] 修改私隱政策內你實際使用的第三方服務
- [ ] 在服務條款填正式訂金／退款／修訂規則
- [ ] 用手機和電腦各測一次表單
- [ ] 將一個真實 Past Paper inquiry 由頭試到尾
- [ ] 若使用 custom domain，開啟 HTTPS

## 7. 下一階段建議

當有穩定訂單後，再加：

- 真正 PDF 上傳（Supabase Storage / Cloudflare R2 / S3）
- Order dashboard
- Stripe / FPS / PayMe 付款指示
- 自動產生 order ID
- Email 通知
- 客戶登入及交付下載區
- 案例 CMS / Blog / SEO landing pages
