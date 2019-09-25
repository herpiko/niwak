import React, {Component} from 'react';
import qs from 'qs';
import aes256 from 'aes256';
import data from './recipients.json';
import './App.css';
const secretKey = process.env.REACT_APP_SECRET_KEY;
class App extends Component {
  state = {
    isValidRecipient: false,
    recipientName: '',
  };
  componentDidMount() {
    let query = qs.parse(window.location.search.replace('?', ''));
		if (!query.recipient) {
			return;
		}
    if (data.recipients[query.recipient.substr(0, 6)]) {
      const key = secretKey + query.recipient;
      console.log(key);
      const cipher = aes256.createCipher(key);
      const re = /[^a-z\d]/i;
      // Recipient
      const encryptedRecipient =
        data.recipients[query.recipient.substr(0, 6).toUpperCase()].recipient
      console.log(encryptedRecipient);
      const decryptedRecipient = cipher.decrypt(encryptedRecipient);
      // Payload
      const encryptedPayload =
        data.recipients[query.recipient.substr(0, 6).toUpperCase()].payload
      const decryptedPayload = cipher.decrypt(encryptedPayload);
			var payload;
      try {
        payload = JSON.parse(decryptedPayload)
      } catch(e) {
        return;
      }
			payload.recipientName = decryptedRecipient;
			payload.isValidRecipient = true;
      this.setState(payload);
    }
  }
  render() {
    return !this.state.isValidRecipient ? (
      <div
        style={{
          margin: '0 auto',
          marginTop: '100px',
          width: '100%',
          textAlign: 'center',
        }}>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.youtube.com/watch?v=Zlv1rdcpS9M"
          style={{width: '100%'}}>
          <img
            alt="marry_you"
            src="https://emos.plurk.com/1703a6090e1691631ea51377123f3bed_w48_h48.gif"
          />
        </a>
      </div>
    ) : (
      <div className="App">
        <div className="row" style={{marginTop: 12, padding: '10px'}}>
          <div
            className="card col s12 l8 offset-l2"
            style={{textAlign: 'center', paddingTop: '-5px'}}>
            <p className="recipient">
              Yth Bapak/Ibu/Saudara/i
              <br />
              <span style={{fontWeight: 'bold'}} id="to-name">
                {this.state.recipientName} & Keluarga
              </span>
            </p>
          </div>
          <div className="col s12 l8 offset-l2" style={{textAlign: 'center'}}>
            <div className="name-wrapper">
              <p id="wife">{this.state.wifeName}</p>
              <p id="and">&</p>
              <p id="husband">{this.state.husbandName}</p>
            </div>
          </div>
          <div id="main-card" className="card card-corner col s12 l8 offset-l2">
            <div className="card-content">
              <div className="centered-text" style={{color: 'rgba(0,0,0,0.7)'}}>
                <p>
                  <i>Bismillahirrahmannirrahim</i>
                </p>
                <p>
                  <i>Assalamu'alaikum Warahmatullahi Wabarakatuh</i>
                </p>
                <br />
                <br />
                <p>Maha Suci Allah yang telah menciptakan</p>
                <p>mahluk-Nya berpasang-pasangan.</p>
                <p>Kami bermaksud menyelenggarakan</p>
                <p>akad dan resepsi pernikahan putra-putri kami:</p>
                <br />
                <br />
                <p className="full-name">{this.state.wifeFullName}</p>
                <p style={{fontSize: '16px'}}>
                  {this.state.wifeFullNameCaption}
                </p>
                <br />
                <p style={{fontSize: '52px', paddingBottom: 15}}>&</p>
                <p className="full-name">{this.state.husbandFullName}</p>
                <p style={{fontSize: '16px'}}>
                  {this.state.husbandFullNameCaption}
                </p>
                <br />
                <br />
                <br />
                <p>yang insyaAllah akan dilaksanakan pada:</p>
                <br />
              </div>
              <div className="row time-info" style={{marginTop: '30px'}}>
                <div style={{fontWeight: 'bold', fontFamily: 'EasyNovember'}}>
                  <div
                    className="col info s12 l4 centered-text"
                    style={{color: 'rgba(0,0,0,0.7)', fontSize: '16px'}}>
                    <p>Akad</p>
                    <p>09.30 WIB</p>
                  </div>
                  <div className="col info s12 l4 centered-text border-left-right time-info-date">
                    <p>{this.state.day},</p>
                    <p>{this.state.date}</p>
                  </div>
                  <div
                    className="col info s12 l4 centered-text"
                    style={{color: 'rgba(0,0,0,0.7)', fontSize: '16px'}}>
                    <p>Resepsi</p>
                    <p>11.00-16.00 WIB</p>
                  </div>
                </div>
              </div>
              <div className="row" style={{marginTop: '30px'}}>
                <div className="col s12 centered-text">
                  <br />
                  <p>bertempat di:</p>
                  <p>{this.state.address1}</p>
                  <p>{this.state.address2}</p>
                  <p>{this.state.address3}</p>
                  <p>{this.state.address4}</p>
                  <p>{this.state.address5}</p>
                  <div
                    className="centered-text"
                    style={{marginBottom: 50, marginTop: 15}}>
                    <button
                      className={'btn btn-primary'}
                      onClick={() => {
                        window.location = this.state.addressLocation;
                      }}>
                      Lihat peta
                    </button>
                  </div>
                  <br />
                  <br />
                  <p>Merupakan suatu kehormatan & kebahagiaan bagi kami</p>
                  <p>apabila Bapak/Ibu/Saudara/i berkenan hadir</p>
                  <p>untuk memberikan doa restu kepada putra putri kami.</p>
                  <br />
                  <br />
                  <p>
                    <i>Wassalamu'alaikum Warahmatullahi Wabarakatuh</i>
                  </p>
                  <br />
                  <br />
                  <p>Yang berbahagia,</p>
                  <br />
                </div>
                <div
                  className="col info s12 l4 centered-text"
                  style={{color: 'rgba(0,0,0,0.7)'}}>
                  <p>Keluarga</p>
                  <p>{this.state.wifeFamily1}</p>
                  <p>{this.state.wifeFamily2}</p>
                </div>
                <div className="col info s12 l4 centered-text border-left-right"></div>
                <div
                  className="col info s12 l4 centered-text"
                  style={{color: 'rgba(0,0,0,0.7)'}}>
                  <p>Keluarga</p>
                  <p>{this.state.husbandFamily1}</p>
                  <p>{this.state.husbandFamily2}</p>
                </div>
              </div>
              <div className="centered-text">
                <img
                  className="separator"
                  alt={'separator'}
                  style={{height: '75px'}}
                  src={require('./assets/separator.png')}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
