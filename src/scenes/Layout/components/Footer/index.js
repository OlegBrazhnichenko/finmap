import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import {withStyles} from '@material-ui/core/styles';

import {styles} from './styles';

class Footer extends Component {
  static propTypes = {
    classes: PropTypes.object,
  };

  render(){
    const {classes} = this.props;
    return (
      <div className={classes.footer}>
        <Grid container justify={"space-between"} className={classes.footerContent}>
          <Grid container item md={5} justify={"space-around"} className={classes.links}>
            <Grid item sm={5} md={5}>
              <Typography paragraph variant={"subtitle2"} color={"inherit"}>
                Продукт
              </Typography>
              <Typography paragraph variant={"subtitle2"} color={"inherit"}>
                Регистрация
              </Typography>
              <Typography paragraph variant={"subtitle2"} color={"inherit"}>
                Контакты
              </Typography>
              <Typography paragraph variant={"subtitle2"} color={"inherit"}>
                Тарифы
              </Typography>
            </Grid>
            <Grid item sm={5} md={7}>
              <Typography paragraph variant={"subtitle2"} color={"inherit"}>
                Безопасность
              </Typography>
              <Typography paragraph variant={"subtitle2"} color={"inherit"}>
                Стать партнером
              </Typography>
              <Typography paragraph variant={"subtitle2"} color={"inherit"}>
                Договор оферты
              </Typography>
              <Typography paragraph variant={"subtitle2"} color={"inherit"}>
                Политика конфиденциальности
              </Typography>
            </Grid>
          </Grid>
          <Grid item container sm={11} md={5} justify={"center"}>
            <Grid item xs={10} sm={10} md={12}>
              <Typography paragraph className={classes.finMapLogo} variant={"h4"}>
                Finmap
              </Typography>
              <Typography paragraph variant={"subtitle2"} color={"inherit"}>
                Права на товарный знак «FINMAP» принадлежат ФОП Каунов Иван Сергеевич.
                Все материалы, размещенные на данном сайте, являются авторскими. Если
                вы хотите любым образом использовать их на своих ресурсах, вам необходимо
                получить письменное предварительное разрешение автора.
              </Typography>
              <Typography paragraph variant={"subtitle2"} color={"inherit"}>
                support@finmap.online
              </Typography>
            </Grid>

          </Grid>

        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(Footer);
