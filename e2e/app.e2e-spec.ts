import { AlbumApp2Page } from './app.po';

describe('album-app2 App', function() {
  let page: AlbumApp2Page;

  beforeEach(() => {
    page = new AlbumApp2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
