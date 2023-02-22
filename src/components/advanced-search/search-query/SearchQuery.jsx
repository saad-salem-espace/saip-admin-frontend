import { useTranslation } from 'react-i18next';
import { Formik, Form } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import Button from '../../shared/button/Button';
import SearchField from './search-field/SearchField';

function SearchQuery() {
  const { t } = useTranslation('search');
  return (
    <div>
      <Formik>
        {() => (
          <Form>
            <SearchField />
            <SearchField />
            <Button
              variant="outline-primary"
              className="mb-9"
              size="sm"
              text={<>
                <FontAwesomeIcon icon={faCirclePlus} className="me-4" />
                {t('addSearchField')}
                {/* eslint-disable-next-line react/jsx-indent */}
                    </>}
            />
            <div className="border-top d-flex justify-content-end pt-4 pb-8">
              <Button
                variant="outline-primary"
                className="me-4"
                size="sm"
              // onClick={}
                text={t('clear')}
              />
              <Button
                variant="primary"
                type="submit"
                size="sm"
              // onClick={}
                text={t('apply')}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default SearchQuery;
