import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NoticeService } from '../../services/notice.service';
import { formatDate, Location } from '@angular/common';
import * as _ from 'lodash';

@Component({
  selector: 'app-citation-details',
  templateUrl: './citation-details.component.html',
  styleUrls: ['./citation-details.component.scss']
})
export class CitationDetailsComponent implements OnInit {

  citationId: any;
  isLoading = true;
  noticeInfo: any;
  ticketInfo: any;
  issuanceInfo: any;
  financialInfo: any;

  constructor(
    private route: ActivatedRoute,
    private noticeService: NoticeService,
    @Inject(LOCALE_ID) private locale: string,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.citationId = params['citaionsId'];
    });
    this.getCitationDetails();
  }

  getCitationDetails() {
    this.noticeService.getCitationDetails(this.citationId).subscribe((res) => {
      this.noticeInfo = this.formatInformation(_.get(res, '_citationModel'), 'notice');
      this.ticketInfo = this.formatInformation(_.get(res, '_citationModel'), 'ticket');
      this.issuanceInfo = this.formatInformation(_.get(res, '_citationModel'), 'issuance');
      this.financialInfo = this.formatInformation(_.get(res, '_citationModel'), 'financial')
      this.isLoading = false;
    });
  }

  formatInformation(info: any, tab: string) {
    if (tab == 'notice') {
      return {
        title: 'Notice Information',
        titleTextRight: false,
        headingTextRight: false,
        bodyTextRight: false,
        id: 'notice_info',
        details: _.size(info) > 0 ? [
          {
            key: 'Notice sequence Number',
            value: _.get(info, 'sequenceNumber') ? _.get(info, 'sequenceNumber') : '0'
          },
          {
            key: 'Page',
            value: _.get(info, 'pageNumber') ? _.get(info, 'pageNumber') : '0'
          },
          {
            key: 'Total number of Page',
            value: _.get(info, 'numberOfPages') ? _.get(info, 'numberOfPages') : '0'
          },
          {
            key: 'Notice type and description',
            value: _.get(info, 'noticeTypeDescription') ? _.get(info, 'noticeTypeDescription') : null
          },
          {
            key: 'Notice date',
            value: _.get(info, 'mailDate') && !_.includes(info['mailDate'], 1900) ? this.onlyDateFormat(_.get(info, 'mailDate')) : null
          }
        ] : []
      }
    } else if (tab == 'ticket') {
      return {
        title: 'Ticket Information',
        titleTextRight: false,
        headingTextRight: false,
        bodyTextRight: false,
        id: 'ticket_info',
        details: _.size(info) > 0 ? [
          {
            key: 'Ticket number',
            value: _.get(info, 'citationNumber') ? _.get(info, 'citationNumber') : null
          },
          {
            key: 'Location',
            value: _.get(info, 'locationDesc') ? _.get(info, 'locationDesc') : null
          },
          {
            key: 'Plate',
            value: _.get(info, 'vinNumber') ? _.get(info, 'vinNumber') : null
          },
          {
            key: 'Violation',
            value: _.get(info, 'violName') ? _.get(info, 'violName') : null
          },
          {
            key: 'Issued',
            value: _.get(info, 'issueDateTime') && !_.includes(info['issueDateTime'], 1900) ? this.onlyDateAndTimeFormat(_.get(info, 'issueDateTime')) : null
          }
        ] : []
      }
    } else if (tab == 'issuance') {
      return {
        title: 'Issuance information',
        titleTextRight: false,
        headingTextRight: false,
        bodyTextRight: false,
        id: 'issuance_info',
        details: _.size(info) > 0 ? [
          {
            key: 'Badge',
            value: _.get(info, 'badgeNumber') ? _.get(info, 'badgeNumber') : null
          },
          {
            key: 'Agency',
            value: _.get(info, 'agencyCode') ? _.get(info, 'agencyCode') : null
          },
          {
            key: 'Micro-Fiche number',
            value: _.get(info, 'microFilmNo') ? _.get(info, 'microFilmNo') : '0'
          },
          {
            key: 'Meter',
            value: _.get(info, 'meter') ? _.get(info, 'meter') : null
          },
          {
            key: 'Previous mail type',
            value: _.get(info, 'lastMailType') ? _.get(info, 'lastMailType') : null
          },
          {
            key: 'Previous mail date',
            value: _.get(info, 'lastMailDate') && !_.includes(info['lastMailDate'], 1900) ? this.onlyDateFormat(_.get(info, 'lastMailDate')) : null
          },
          {
            key: 'Registry make',
            value: _.get(info, 'registryMake') ? _.get(info, 'registryMake') : null
          },
          {
            key: 'Color',
            value: _.get(info, 'color') ? _.get(info, 'color') : null
          },
          {
            key: 'Style',
            value: _.get(info, 'bodyStyle') ? _.get(info, 'bodyStyle') : null
          },
          {
            key: 'Plate expiration date',
            value: _.get(info, 'plateExpireDate') && !_.includes(info['plateExpireDate'], 1900) ? this.onlyDateFormat(_.get(info, 'plateExpireDate')) : null
          },
          {
            key: 'Plate year',
            value: _.get(info, 'vehicleYearMonth') ? _.get(info, 'vehicleYearMonth') : '0'
          },
          {
            key: 'Settlement date',
            value: _.get(info, 'settlementDate') && !_.includes(info['settlementDate'], 1900) ? this.onlyDateFormat(_.get(info, 'settlementDate')) : null
          },
          {
            key: 'Settlement id',
            value: _.get(info, 'settlementId') ? _.get(info, 'settlementId') : null
          }
        ] : []
      }
    } else {
      let financialArray = [];
      if (_.size(_.get(info, 'financialInformation')) > 0) {
        financialArray.push({
          key: 'Fine',
          value: _.get(info, 'financialInformation')[0].penalty ? _.get(info, 'financialInformation')[0].penalty : '0'
        })
        for (let i = 1; i < _.size(_.get(info, 'financialInformation')); i++) {
          financialArray.push(
            {
              key: `Penalty ${i}`,
              value: _.get(info, 'financialInformation')[i].penalty ? _.get(info, 'financialInformation')[i].penalty : '0'
            }
          )
        }
        financialArray.push(
          {
            key: 'Max Fine / Penalty',
            value: _.get(info, 'financialInformation')[0].maxPenalty ? _.get(info, 'financialInformation')[0].maxPenalty : '0'
          },
          {
            key: 'Reduction Amount',
            value: _.get(info, 'financialInformation')[0].reductionAmount ? _.get(info, 'financialInformation')[0].reductionAmount : '0'
          },
          {
            key: 'Total due',
            value: _.get(info, 'financialInformation')[0].totalDue ? _.get(info, 'financialInformation')[0].totalDue : '0'
          },
          {
            key: 'Paid to Date',
            value: _.get(info, 'financialInformation')[0].paidToDate ? _.get(info, 'financialInformation')[0].paidToDate : '0'
          }
        )
      }
      return {
        title: 'Financial Information',
        titleTextRight: false,
        headingTextRight: false,
        bodyTextRight: false,
        id: 'financial_info',
        details: financialArray
      }
    }
  }

  back() {
    this.location.back();
  }

  onlyDateFormat(date: any) {
    return formatDate(date, 'MMM d, y', this.locale);
  }

  onlyDateAndTimeFormat(date: any) {
    return formatDate(date, 'MMM d, y h:mm a', this.locale);
  }

  onlyTime(date: any) {
    return formatDate(date, 'h:mm a', this.locale);
  }
}
