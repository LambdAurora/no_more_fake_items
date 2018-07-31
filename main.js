if (document.title.includes('Steam Community :: Trade Offers'))
{
  //console.log("No more fake items is running on this page!");
  let tradeoffers = document.querySelector('div.profile_leftcol');
  tradeoffers.querySelectorAll('div.tradeoffer').forEach(offer => {
    let tradeoffer_id = offer.id;
    let footer = offer.querySelector('div.tradeoffer_footer');

    let check_div = document.createElement('div');

    let check_span = document.createElement('span');
    check_div.appendChild(check_span);

    // Select
    let check_select = document.createElement('select');

    let default_option = document.createElement('option');
    default_option.appendChild(document.createTextNode('Which game are the items from?'));
    default_option.value = '';
    default_option.disabled = true;
    default_option.selected = true;
    check_select.appendChild(default_option);

    let tf2_option = document.createElement('option');
    tf2_option.appendChild(document.createTextNode('440 - Team Fortress 2'));
    tf2_option.value = '440';
    check_select.appendChild(tf2_option);

    let dota2_option = document.createElement('option');
    dota2_option.appendChild(document.createTextNode('570 - Dota 2'));
    dota2_option.value = '570';
    check_select.appendChild(dota2_option);

    let csgo_option = document.createElement('option');
    csgo_option.appendChild(document.createTextNode('730 - Counter-Strike: Global Offensive'));
    csgo_option.value = '730';
    check_select.appendChild(csgo_option);

    check_div.appendChild(check_select);

    // Button
    let check_button = document.createElement('button');
    check_button.appendChild(document.createTextNode('Check items!'));
    check_div.appendChild(check_button);

    footer.appendChild(check_div);

    check_button.addEventListener('click', () => {
      let game = check_select.value;

      if (game === '')
      {
        check_span.innerText = 'Please choose a game origin!';
        return;
      }

      check_span.innerText = 'Checking items for game "' + game + '"...';
      let items = offer.querySelectorAll('div.trade_item');
      let fake_items = false;
      items.forEach(item => {
        let data_economy_item = item.getAttribute('data-economy-item');
        let game_origin = data_economy_item.replace('classinfo/', '').split('/')[0];

        if (!(game_origin === game))
        {
          fake_items = true;
          item.classList.add('fake_item');
        }
      });
      if (fake_items)
      {
        check_span.innerText = 'This trade contains fake items!';
        check_span.classList.add('fake_items');
      }
      else
      {
        check_span.innerText = 'This trade doesn\'t contain any fake items!';
        check_span.classList.add('no_fake_items');
      }

      check_select.disabled = true;
      check_button.disabled = true;
    });
  });
}
